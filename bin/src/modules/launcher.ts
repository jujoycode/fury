// base
import { Base } from "../base";

// model
import FunctionModel from "../models/functionModel";
import ProjectModel from "../models/projectModel";

// interface
import { ReturnObj, RunRequest, ProcessRequest } from "../interface";

// ora
import ora, { Ora } from "ora";

export default class Launcher extends Base {
  private ora: Ora;
  private workDir: string;
  private projectInfo: ProjectModel;

  constructor(projectInfo: ProjectModel) {
    super();

    this.ora = ora();
    this.ora.spinner = "arc";

    this.workDir = process.cwd();

    this.projectInfo = projectInfo;
  }

  public getWorkDir(): string {
    return this.workDir;
  }

  public setWorkDir(path: string): void {
    this.workDir = process.cwd() + path;
  }

  private async run<T>(request: RunRequest<T>): Promise<ReturnObj<T>> {
    this.ora.text = ` ${request.name}`;
    this.ora.start();

    const returnObj = { success: true } as ReturnObj<T>;

    try {
      returnObj.data = await request.run();
      this.ora.succeed(this.setStyle("greenBright", request.name));
    } catch (error) {
      returnObj.success = false;
      this.ora.fail(this.setStyle("red", " Process Fail, Check Error Context ↓↓ \n"));
      console.error(error);
    }

    return returnObj;
  }

  public async processRun(request: ProcessRequest): Promise<ReturnObj<string>> {
    let returnObj: ReturnObj<string> = { success: true };

    const reqFunction = new FunctionModel<string>(request, this.workDir);

    // 전문 변조
    if (request.transform) {
      reqFunction.modulation({ ...request.transform, projectInfo: this.projectInfo.getModel() });
    }

    returnObj = await this.run<string>(reqFunction.getFunctionData());

    // validation

    return returnObj;
  }
}
