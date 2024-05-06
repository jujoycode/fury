// util
import { FileUtil } from "../utils/fileUtils";
import { folderStructure } from "../constants/folderStructure";
import jsPackage from "../templates/js.package.json";
import tsConfig from "../templates/tsconfig.json";

// interface
import { Factory } from "../interface/factory";
import { ProjectInfo } from "../interface/program";

export class PlaneProjectFactory implements Factory {
  public projectInfo: ProjectInfo;
  public workDir: string;

  constructor(projectInfo: ProjectInfo, workDir: string) {
    this.projectInfo = projectInfo;
    this.workDir = workDir;
  }

  public async build(): Promise<void> {
    // 1. project dir 생성
    await FileUtil.createFolder(this.projectInfo.projectName, this.workDir);
    this.workDir = FileUtil.joinPath(this.workDir, this.projectInfo.projectName);

    // 2. 폴더 구조 생성
    await FileUtil.createRecursiveFolder(
      folderStructure[this.projectInfo.projectLanguage],
      this.workDir
    );

    // 3. 설정 파일 추가
    jsPackage.name = this.projectInfo.projectName
    await FileUtil.createFile(this.workDir, "package", "json", JSON.stringify(jsPackage, null, 2));

    if (this.projectInfo.projectLanguage === "ts") {
      await FileUtil.createFile(
        this.workDir,
        "tsconfig",
        "json",
        JSON.stringify(tsConfig, null, 2)
      );
    }
  }
}
