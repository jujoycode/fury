import { BaseModel } from "./baseModel";
import { ProcessRequest, RunRequest } from "../interface";

// execa
import execa from "execa";

export default class FunctionModel<T> extends BaseModel<ProcessRequest> {
  private cwd?: string;

  public name: string;
  public method: () => Promise<T>;

  constructor(modelData: ProcessRequest, cwd?: string) {
    super(modelData);
    this.cwd = cwd;

    this.name = modelData.processName;
    this.method = this.setFunction(modelData.method);
  }

  private setFunction<T>(method: string): () => Promise<T> {
    const func = async () => {
      return (await execa(method, this.cwd ? { cwd: this.cwd } : {})) as T;
    };

    return func;
  }

  public getFunctionData(): RunRequest<T> {
    return { name: this.name, run: this.method };
  }
}
