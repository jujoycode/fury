// core
import { Launcher } from "../core";

// util
import { FileUtil } from "../utils/fileUtils";
import { Logger } from "../utils";

// constants
import { folderStructure } from "../constants/folderStructure";

// template
import jsPackage from "../templates/js.package.json";
import tsPackage from "../templates/ts.package.json";
import tsConfig from "../templates/tsconfig.json";

// interface
import { Factory, Spinner } from "../interface/factory";
import { ProjectInfo } from "../interface/program";
import { METHOD } from "../constants/method";

export class PlaneProjectFactory implements Factory {
  private logger: Logger
  private Launcher: Launcher
  public projectInfo: ProjectInfo;
  public workDir: string;
  public factorySpinner: Spinner

  constructor(projectInfo: ProjectInfo, workDir: string, factorySpinner: Spinner) {
    this.workDir = workDir;
    this.projectInfo = projectInfo;
    this.factorySpinner = factorySpinner
    this.logger = new Logger()
    this.Launcher = new Launcher()
  }

  public async build(): Promise<void> {
    const buildSpinner = this.factorySpinner.start('Create Project...')
    const createDir = this.factorySpinner.render()
    const createFolder = this.factorySpinner.render()
    const createJson = this.factorySpinner.render()
    const installPackage = this.factorySpinner.render()

    try {
      // 1. project dir 생성
      createDir.start('Create Project Directory...')

      await FileUtil.createFolder(this.projectInfo.projectName, this.workDir);
      this.workDir = FileUtil.joinPath(this.workDir, this.projectInfo.projectName);

      createDir.succeed('Create Project Directory')

      // 2. 폴더 구조 생성
      createFolder.start('Create Folder...')

      await FileUtil.createRecursiveFolder(
        folderStructure[this.projectInfo.projectLanguage],
        this.workDir
      );

      createFolder.succeed('Create Folder')

      // 3. 설정 파일 추가
      createJson.start('Create Project Config...')

      let projectPackage = jsPackage
      if (this.projectInfo.projectLanguage === 'ts') {
        projectPackage = tsPackage

        await FileUtil.createFile(
          this.workDir,
          "tsconfig",
          "json",
          JSON.stringify(tsConfig, null, 2)
        );
      }

      projectPackage.name = this.projectInfo.projectName
      await FileUtil.createFile(this.workDir, "package", "json", JSON.stringify(projectPackage, null, 2));

      createJson.succeed('Create Project Config')

      // 4. package 설치
      this.Launcher.setWorkDir(this.workDir)

      installPackage.start('Install Packages...')

      await this.Launcher.runDirectMethod(METHOD.PACKAGE_INSTALL[this.projectInfo.packageManager])

      installPackage.succeed('Install Packages')
      buildSpinner.succeed('Done')

    } catch (error: any) {
      buildSpinner.fail('Process Fail')
      this.logger.debug(error)
    }
  }
}
