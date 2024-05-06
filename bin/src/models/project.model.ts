// model
import BaseModel from "./baseModel";
import {
  INT_PROJECT,
  T_PACAKGE_MANAGER,
  T_PROJECT_DATA,
  T_PROJECT_TEMPLATE,
} from "../interfaces/model.project";

// constants
import { CONFIG } from "../constants/config";
import { GENERATE_METHOD } from "../constants/method";

// interface
import type CLI from "../core/cli";

export class ProjectModel extends BaseModel {
  private projectName: string = "";
  private packageManager: T_PACAKGE_MANAGER = "npm";
  private prorjectTemplate: T_PROJECT_TEMPLATE = "js";
  private gitUsage: boolean = false;
  private gitRepoUrl?: string;

  constructor(CLI: CLI) {
    super(CLI, "ProjectModel");
  }

  private prepareMethod() {
    const methods = GENERATE_METHOD;

    Object.values(methods).forEach((method) => {
      if (method.translate && this[method.translate]) {
        method.magic = method.magic.replace("@", this[method.translate]!.toString());
      }
    });

    return methods;
  }

  public async getData(): Promise<T_PROJECT_DATA> {
    try {
      this.projectName = await this.CLI.getInputValue(CONFIG.PROJECT_NAME);
      this.packageManager = await this.CLI.getSeletValue<T_PACAKGE_MANAGER>(CONFIG.PACKAGE_MANAGER);
      this.prorjectTemplate = await this.CLI.getSeletValue<T_PROJECT_TEMPLATE>(CONFIG.PROJECT_TYPE);
      this.gitUsage = await this.CLI.getConfirmValue(CONFIG.GIT_USAGE);

      if (this.gitUsage) {
        this.gitRepoUrl = await this.CLI.getInputValue(CONFIG.GIT_REPOSITORY_URL);
      }

      const methods = this.prepareMethod();

      return {
        projectName: this.projectName,
        packageManager: this.packageManager,
        prorjectTemplate: this.prorjectTemplate,
        gitUsage: this.gitUsage,
        gitRepoUrl: this.gitRepoUrl,
        methods,
      };
    } catch (error: any) {
      throw new error();
    }
  }
}
