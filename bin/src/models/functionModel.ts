import { BaseModel } from "./baseModel";
import { ProcessRequest, ProjectInterface, RunRequest } from "../interface";

// execa
import execa from "execa";

export default class FunctionModel<T> extends BaseModel<ProcessRequest> {
  private cwd?: string;

  public name: string;
  public method: () => Promise<T>;

  constructor(modelData: ProcessRequest, cwd?: string) {
    super(modelData);
    this.cwd = cwd;

    this.name = this.data.processName;
    this.method = this.setFunction(this.data.method);
  }

  private setFunction<T>(method: string): () => Promise<T> {
    const func = async () => {
      return (await execa.command(method, { cwd: this.cwd })) as T;
    };

    return func;
  }

  public getFunctionData(): RunRequest<T> {
    return { name: this.name, run: this.method };
  }

  public modulation({
    target,
    source,
    projectInfo,
  }: {
    target: string;
    source: keyof ProjectInterface;
    projectInfo: ProjectInterface;
  }) {
    const beforeMethod = this.getData("method");

    const sourceData = projectInfo[source] as string;
    const afterMethod = beforeMethod.replace(target, sourceData);

    this.method = this.setFunction(afterMethod);
  }
}
