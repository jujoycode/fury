// base
import { BaseCommand } from "./baseCommand";
// constant
import { CONFIG } from "../constants/config";
// factory
import { ProjectFactory } from "../factory/projectFactory";
// interface
import type { Logger } from "../utils";
import type { CLI } from "../core";
import {
  PackageManager,
  ProjectInfo,
  ProjectLanguage,
  projectTemplate,
} from "../interface/program";

export class CreateProjectCommand extends BaseCommand {
  private CLI: CLI;
  private projectInfo: ProjectInfo | null = null;

  constructor(logger: Logger, CLI: CLI) {
    super(logger);
    this.logger = logger;
    this.CLI = CLI;

    this.logger.debug("✨ New Command → CreateProjectCommand");
  }

  public async initialize(): Promise<void> {
    this.logger.empty()

    const projectInfo: ProjectInfo = {
      projectName: await this.CLI.getInputValue(CONFIG.PROJECT_NAME),
      packageManager: await this.CLI.getSeletValue<PackageManager>(CONFIG.PACKAGE_MANAGER),
      projectLanguage: await this.CLI.getSeletValue<ProjectLanguage>(CONFIG.PROJECT_LANG),
      projectTemplate: await this.CLI.getSeletValue<projectTemplate>(CONFIG.PROJECT_TEMPLATE),
      gitUsage: await this.CLI.getConfirmValue(CONFIG.GIT_USAGE),
    };

    if (projectInfo.gitUsage) {
      projectInfo.gitRepoUrl = await this.CLI.getInputValue(CONFIG.GIT_REPOSITORY_URL);
    }

    this.projectInfo = projectInfo;

    this.logger.empty()
  }

  public async execute(): Promise<void> {
    if (this.projectInfo === null) {
      throw new Error("Emtpy Info");
    }

    const spinner = this.spinner(' Creating Project...')

    // 1. factory 생성
    const projectFactory = new ProjectFactory(this.projectInfo);

    // 2. 프로젝트 생성
    await projectFactory.getFactory().build();

    spinner.succeed(' Done')
  }

  public async finalize(): Promise<void> {
    // 4. if using git, setting
    // 5. install package
  }

  public async undo(): Promise<void> { }
}
