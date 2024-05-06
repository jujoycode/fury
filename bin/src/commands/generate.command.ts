// core
import { Launcher } from "../core/launcher";

// model
import { ProjectModel } from "../models/project.model";

// util
import Log from "../utils/log";

// interface
import type CLI from "../core/cli";
import { Command } from "../interfaces/command";
import { T_PROJECT_DATA } from "../interfaces/model.project";
import { ProjectUtil } from "../utils/projectUtil";
import { Context } from "../constants/values";

export class GenerateCommand implements Command {
  private log: Log;
  private Launcher: Launcher;
  private projectModel: ProjectModel;

  constructor(CLI: CLI) {
    this.log = Log.getInstance("GenerateCommand");
    this.Launcher = new Launcher();
    this.projectModel = new ProjectModel(CLI);
    this.setupEventHandlers();
  }

  public async execute() {
    const projectData = await this.projectModel.getData();
    this.projectModel.emit("genReady", projectData);
  }

  private setupEventHandlers() {
    this.projectModel.on("genReady", (data: T_PROJECT_DATA) => {
      this.generateProject(data);
    });
  }

  private async generateProject(data: T_PROJECT_DATA) {
    this.log.start("Project Generate");

    // 1. 프로젝트 폴더 생성
    await this.Launcher.run(data.methods.CREATE_PROJECT_DIRECTORY);

    // 2. 생성한 프로젝트 폴더로 작업 경로 변경
    this.Launcher.workingDir = data.projectName;

    // 3. 설정 파일 생성
    await this.Launcher.runDirectCode({
      info: "Init Package Manager",
      func: () => this.makeJson(data),
    });

    // 4. 기본 구조 생성
    await this.Launcher.runDirectCode({
      info: "Make Default Structure",
      func: () => this.makeDefaultStructure(data.prorjectTemplate),
    });

    // 5. git 초기 처리
    if (data.gitUsage) {
      await this.Launcher.run(data.methods.INIT_GIT);
      await this.Launcher.run(data.methods.ADD_REMOTE_ORIGIN);
      await this.Launcher.runDirectCode({
        info: "Make .gitignore",
        func: () => this.makeIgnore(".gitignore", "node_modules"),
      });
    }

    // 6. node_modules 설치
    await this.Launcher.run({
      info: "Install Packages",
      magic: `${Context.installScript[data.packageManager]}`,
    });

    this.log.end(`Project Generate`);
  }

  private async makeDefaultStructure(fileExtension: string) {
    ProjectUtil.makeDirectory(`${this.Launcher.workingDir}/src`);
    ProjectUtil.makeFile(
      `${this.Launcher.workingDir}/src/app.${fileExtension}`,
      `console.log('Happy Hack with fury🔥')`
    );
  }

  private async makeJson(data: T_PROJECT_DATA) {
    await ProjectUtil.makeJson(data.prorjectTemplate, this.Launcher.workingDir, data.projectName);
  }

  private async makeIgnore(fileName: string, data: string) {
    await ProjectUtil.makeFile(`${this.Launcher.workingDir}/${fileName}`, data);
  }
}
