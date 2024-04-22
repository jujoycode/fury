// base
import { Base } from "../base";

// model
import FunctionModel from "../models/functionModel";
import ProjectModel from "../models/projectModel";

// interface
import { ReturnObj, RunRequest, ProcessRequest, ModelType } from "../interface";

// ora
import ora, { Ora } from "ora";

// error
import { ProcessError } from "../error/processError";

export default class Launcher<T extends ModelType> extends Base {
  private ora: Ora;
  private workDir: string;
  private projectInfo: ProjectModel<T>;

  constructor(projectInfo: ProjectModel<T>) {
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

  public async run<T>(request: RunRequest<T>): Promise<ReturnObj<T>> {
    this.ora.text = ` ${request.name}`;
    this.ora.start();

    const returnObj = { success: true } as ReturnObj<T>;

    try {
      returnObj.data = await request.run();
      this.ora.succeed(this.setStyle("greenBright", request.name));
    } catch (error) {
      returnObj.success = false;
      this.ora.fail(this.setStyle("red", " Process Fail, Check Error Context ↓↓ \n"));
      throw new ProcessError("Launcher Fail", error);
    }

    return returnObj;
  }

  public async processRun(request: ProcessRequest): Promise<ReturnObj<string>> {
    let returnObj: ReturnObj<string> = { success: true };

    const reqFunction = new FunctionModel<string, T>(request, this.workDir);

    // 전문 변조
    if (request.transform) {
      reqFunction.modulation({
        projectInfo: this.projectInfo.getModel(),
        source: request.transform.source as keyof T,
        target: request.transform.target,
      });
    }

    returnObj = await this.run<string>(reqFunction.getFunctionData());

    // validation

    return returnObj;
  }
}
