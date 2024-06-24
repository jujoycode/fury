// util
import { FileUtil, Logger, ProjectUtil } from '../utils'

// core
import { Launcher } from '../core'

// constants
import { METHOD } from '../constants'

// interface
import { Factory } from '../interface/factory'
import { ProjectInfo } from '../interface/program'

export class ReactProjectFactory implements Factory {
  private logger: Logger
  private Launcher: Launcher
  private ProjectUtil: ProjectUtil
  public projectInfo: ProjectInfo
  public workDir: string

  constructor(projectInfo: ProjectInfo, workDir: string) {
    this.logger = new Logger()
    this.Launcher = new Launcher()
    this.ProjectUtil = new ProjectUtil()
    this.projectInfo = projectInfo
    this.workDir = workDir
  }

  public async build(): Promise<void> {
    try {
      const command = [
        ...METHOD.FRAMEWORK.REACT[this.projectInfo.packageManager],
        this.projectInfo.projectName
      ]

      if (this.projectInfo.projectLanguage === 'ts') {
        command.push(METHOD.FRAMEWORK.REACT.TEMPLATE, 'typescript')
      }

      await this.ProjectUtil.processRun(
        'Create React Project',
        async () => await this.Launcher.run(this.projectInfo.packageManager, command)
      )

      this.Launcher.setWorkDir(FileUtil.joinPath(this.workDir, this.projectInfo.projectName))

      if (this.projectInfo.projectLanguage === 'ts') {
        await this.ProjectUtil.processRun('Preparing', async () => {
          await this.Launcher.run(METHOD.REMOVE, [
            ...METHOD.REMOVE_ALL_OPTION,
            METHOD.NODE_MODULES,
            METHOD.LOCK.npm
          ])

          await this.Launcher.run(this.projectInfo.packageManager, [
            ...METHOD.PACKAGE_INSTALL[this.projectInfo.packageManager],
            '-D',
            '@types/testing-library__jest-dom'
          ])
        })
      }
    } catch (error: any) {
      this.logger.debug(error.message)
    }
  }
}
