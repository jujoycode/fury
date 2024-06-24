// util
import { Logger, FileUtil, ProjectUtil, StringUtil } from '../utils'

// constants
import { folderStructure } from '../constants/folderStructure'

// template
import jsPackage from '../templates/js.package.json'
import tsPackage from '../templates/ts.package.json'
import tsConfig from '../templates/tsconfig.json'
import prettier from '../templates/prettier.json'

// interface
import { Factory } from '../interface/factory'
import { ProjectInfo } from '../interface/program'

export class PlaneProjectFactory implements Factory {
  private logger: Logger
  private ProjectUtil: ProjectUtil
  public projectInfo: ProjectInfo
  public workDir: string

  constructor(projectInfo: ProjectInfo, workDir: string) {
    this.workDir = workDir
    this.projectInfo = projectInfo
    this.logger = new Logger()
    this.ProjectUtil = new ProjectUtil()
  }

  public async build(): Promise<void> {
    try {
      // 1. Directory 생성
      await this.ProjectUtil.processRun('Create Project Directory', async () => {
        await FileUtil.createFolder(this.projectInfo.projectName, this.workDir)
        this.workDir = FileUtil.joinPath(this.workDir, this.projectInfo.projectName)
      })

      // 2. 폴더 구조 생성
      await this.ProjectUtil.processRun('Create Folder', () =>
        FileUtil.createRecursiveFolder(
          folderStructure[this.projectInfo.projectLanguage],
          this.workDir
        )
      )

      // 3. 설정 파일 추가
      await this.ProjectUtil.processRun('Create Project Config', async () => {
        let projectPackage = jsPackage
        if (this.projectInfo.projectLanguage === 'ts') {
          projectPackage = tsPackage

          await FileUtil.createFile(
            this.workDir,
            'tsconfig',
            'json',
            JSON.stringify(tsConfig, null, 2)
          )
        }

        projectPackage.name = this.projectInfo.projectName
        await FileUtil.createFile(
          this.workDir,
          'package',
          'json',
          JSON.stringify(projectPackage, null, 2)
        )
      })

      // 4. Prettier
      await this.ProjectUtil.processRun('Create Formatter', async () => {
        await FileUtil.createFile(
          this.workDir,
          '.prettierrc',
          'yaml',
          StringUtil.convertJsonToYaml(prettier)
        )
      })

    } catch (error: any) {
      this.logger.debug(error.message)
      throw new Error(error.message)
    }
  }
}
