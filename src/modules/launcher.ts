// base
import { Base } from "../base";

// execa
import execa from "execa";

// ora
import ora, { Ora } from "ora";

interface ReturnObject {
  success: boolean;
  data: string;
}

interface SpinnerOption {
  process: string;
  message?: string;
  errorContext?: any;
}

interface RunOption {
  processName: string;
  method: string;
  setMethod?: (param: string) => string;
  setParam?: string;
  validation?: (param: string) => boolean;
  errorMessage?: string;
}

export default class Launcher extends Base {
  private spinner: Ora;
  private workingDir: string;

  constructor() {
    super();
    this.spinner = ora();
    this.spinner.spinner = "arc";
    this.workingDir = process.cwd();
  }

  private startSpinner(processName: string) {
    this.spinner.text = ` ${processName}`;
    this.spinner.start();
  }

  private endSpinner({ process, message, errorContext }: SpinnerOption) {
    switch (process) {
      case "success":
        this.spinner.succeed(this.setStyle("green", message ? `${message}` : " Process Success"));
        break;

      case "fail":
        this.spinner.fail(this.setStyle("red", " Process Fail, Check Error Context ↓↓ \n"));
        console.error(errorContext);
        break;
    }
  }

  public getWorkDir(): string {
    return this.workingDir;
  }

  public setWorkDir(path: string): void {
    this.workingDir = process.cwd() + path;
  }

  public async run({
    processName,
    method,
    setMethod,
    setParam,
    validation,
    errorMessage,
  }: RunOption): Promise<ReturnObject> {
    const sData = { success: true, data: "" };

    this.startSpinner(processName);

    try {
      if (setMethod && setParam) {
        method = setMethod(setParam);
      }
      const objReturn = await execa(`${method}`, { cwd: this.workingDir });

      // validation이 존재한다면, failed를 validation return 값의 부정으로 재할당
      if (validation) {
        objReturn.failed = !validation(objReturn.stdout);
        objReturn.stderr = this.setStyle("red", `→ ${errorMessage}`);
      }

      if (objReturn.failed) {
        this.endSpinner({ process: "fail", errorContext: objReturn.stderr });
        sData.success = false;
      } else {
        this.endSpinner({ process: "success", message: processName });
        sData.data = objReturn.stdout;
      }
    } catch (error) {
      this.endSpinner({ process: "fail", errorContext: error });
      sData.success = false;
    }

    return sData;
  }
}
