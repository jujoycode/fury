// base
import { BaseCommand } from "./baseCommand";
// constant
import { CONFIG, METHOD } from "../constants";
// factory
import { ProjectFactory } from "../factory";
// interface
import { FileUtil, ProjectUtil, type Logger } from "../utils";
import { type CLI, Launcher } from "../core";
import {
  PackageManager,
  ProjectInfo,
  ProjectLanguage,
  // projectTemplate,
} from "../interface/program";

export class CreateProjectCommand extends BaseCommand {
  private CLI: CLI;
  private Launcher: Launcher
  private ProjectUtil: ProjectUtil
  private projectInfo: ProjectInfo | null = null;
  private alreadyExistFlag = false

  constructor(logger: Logger, CLI: CLI) {
    super(logger);
    this.CLI = CLI;
    this.Launcher = new Launcher()
    this.ProjectUtil = new ProjectUtil()
  }

  public async initialize(): Promise<void> {
    const projectInfo: ProjectInfo = {
      projectName: await this.CLI.getInputValue(CONFIG.PROJECT_NAME),
      packageManager: await this.CLI.getSeletValue<PackageManager>(CONFIG.PACKAGE_MANAGER),
      projectLanguage: await this.CLI.getSeletValue<ProjectLanguage>(CONFIG.PROJECT_LANG),
      projectTemplate: 'default',
      // frameworkUsage: await this.CLI.getConfirmValue(CONFIG.FRAMEWORK_USAGE),
      gitUsage: await this.CLI.getConfirmValue(CONFIG.GIT_USAGE),
    };

    //TODO: 프레임워크 탬플릿 제작 시 사용
    // if (projectInfo.frameworkUsage) {
    //   projectInfo.projectTemplate = await this.CLI.getSeletValue<projectTemplate>(CONFIG.PROJECT_TEMPLATE);
    // }

    if (projectInfo.gitUsage) {
      projectInfo.gitRepoUrl = await this.CLI.getInputValue(CONFIG.GIT_REPOSITORY_URL);
    }

    this.workDir = FileUtil.joinPath(process.cwd(), projectInfo.projectName)
    this.projectInfo = projectInfo;
  }

  public async execute(): Promise<void> {
    if (this.projectInfo === null) {
      throw new Error("Emtpy Info");
    }
    if (FileUtil.checkExist(this.workDir)) {
      this.alreadyExistFlag = true
      throw new Error(`Directory already exists`);
    }

    // 1. factory 생성
    const projectFactory = new ProjectFactory(this.projectInfo).getFactory();

    // 2. 프로젝트 생성
    await projectFactory.build();
  }

  public async finalize(): Promise<void> {
    // 4. set working dir
    this.Launcher.setWorkDir(this.workDir)

    // 4. if using git, setting
    if (this.projectInfo?.gitUsage) {
      this.Launcher.setMethod(METHOD.GIT_INIT)
      this.Launcher.setMethod(METHOD.GIT_ADD_REMOTE.replace('@', this.projectInfo.gitRepoUrl!))

      await this.ProjectUtil.processRun('Connect Git Repository', async () => await this.Launcher.runMethod())
    }

    // 5. install package
    this.Launcher.setMethod(METHOD.PACKAGE_INSTALL[this.projectInfo!.packageManager])
    await this.ProjectUtil.processRun('Install Package', async () => await this.Launcher.runMethod())
  }

  public async undo(): Promise<void> {
    // NOTE: alreadyExistFlag가 true라면 삭제할 필요가 없으니 false를 할당 
    const deleteFlag = this.alreadyExistFlag ? false : FileUtil.checkExist(this.workDir)

    if (deleteFlag) {
      this.Launcher.runDirectMethod(METHOD.REMOVE_PROJECT.replace('@', this.projectInfo!.projectName))
    }

    this.logger.info(`Rollback End, Please Troubleshoot and Try again`)
  }
}
