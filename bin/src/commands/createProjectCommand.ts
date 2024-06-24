// base
import { BaseCommand } from './baseCommand'
// constant
import { CONFIG, METHOD } from '../constants'
// factory
import { ProjectFactory } from '../factory'
// interface
import { FileUtil, ProjectUtil, type Logger } from '../utils'
import { type CLI, Launcher } from '../core'
import {
  PackageManager,
  ProjectInfo,
  ProjectLanguage,
  projectTemplate
} from '../interface/program'

export class CreateProjectCommand extends BaseCommand {
  private CLI: CLI
  private Launcher: Launcher
  private ProjectUtil: ProjectUtil
  private projectInfo: ProjectInfo | null = null
  private dataInputFlag = false
  private alreadyExistFlag = false

  constructor(logger: Logger, CLI: CLI) {
    super(logger)
    this.CLI = CLI
    this.Launcher = new Launcher()
    this.ProjectUtil = new ProjectUtil()
  }

  public async initialize(): Promise<void> {
    const projectInfo: ProjectInfo = {
      projectName: await this.CLI.getInputValue(CONFIG.PROJECT_NAME),
      projectLanguage: await this.CLI.getSeletValue<ProjectLanguage>(CONFIG.PROJECT_LANG),
      packageManager: await this.CLI.getSeletValue<PackageManager>(CONFIG.PACKAGE_MANAGER),
      projectTemplate: 'default',
      frameworkUsage: await this.CLI.getConfirmValue(CONFIG.FRAMEWORK_USAGE),
      gitUsage: await this.CLI.getConfirmValue(CONFIG.GIT_USAGE)
    }

    this.logger.empty()
    if (projectInfo.frameworkUsage) {
      projectInfo.projectTemplate = await this.CLI.getSeletValue<projectTemplate>(CONFIG.PROJECT_TEMPLATE);
    }

    if (projectInfo.gitUsage) {
      projectInfo.gitRepoUrl = await this.CLI.getInputValue(CONFIG.GIT_REPOSITORY_URL)
    }

    this.dataInputFlag = true

    this.workDir = FileUtil.joinPath(process.cwd(), projectInfo.projectName)
    this.projectInfo = projectInfo
  }

  public async execute(): Promise<void> {
    this.logger.empty()

    if (this.projectInfo === null) {
      throw new Error('Emtpy Info')
    }
    if (FileUtil.checkExist(this.workDir)) {
      this.alreadyExistFlag = true
      throw new Error(`Directory already exists`)
    }

    // 1. factory 생성
    const projectFactory = new ProjectFactory(this.projectInfo).getFactory()

    // 2. 프로젝트 생성
    await projectFactory.build()
  }

  public async finalize(): Promise<void> {
    // 3. set working dir
    this.Launcher.setWorkDir(this.workDir)

    // 4. if using git, setting
    if (this.projectInfo?.gitUsage) {
      await this.ProjectUtil.processRun(
        'Git Init',
        async () => await this.Launcher.run(METHOD.GIT, METHOD.GIT_INIT)
      )

      const arrCommand = METHOD.GIT_ADD_REMOTE.concat(this.projectInfo.gitRepoUrl!)
      await this.ProjectUtil.processRun(
        'Connect Git Repository',
        async () => await this.Launcher.run(METHOD.GIT, arrCommand)
      )
    }

    // 5. install package
    await this.ProjectUtil.processRun(
      'Install Package',
      async () =>
        await this.Launcher.run(
          this.projectInfo!.packageManager,
          METHOD.PACKAGE_INSTALL[this.projectInfo!.packageManager]
        )
    )
  }

  public async undo(): Promise<void> {
    this.Launcher.setWorkDir(process.cwd())

    if (this.dataInputFlag) {
      // NOTE: alreadyExistFlag가 true라면 삭제할 필요가 없으니 false를 할당
      const deleteFlag = this.alreadyExistFlag ? false : FileUtil.checkExist(this.workDir)

      if (deleteFlag) {
        const arrCommand = METHOD.REMOVE_ALL_OPTION.concat(this.projectInfo!.projectName)
        await this.Launcher.run(METHOD.REMOVE, arrCommand)
      }
    }

    this.logger.info(`Rollback End, Please Troubleshoot and Try again`)
  }
}
