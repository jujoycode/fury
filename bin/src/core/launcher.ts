// execa
import { $, Execa$ } from "execa";

// ora
import ora, { Ora } from "ora";

// util
import { ProjectUtil } from "../utils/projectUtil";
import { INT_METHOD } from "../interfaces/core.launcher";
import Log from "../utils/log";

/**
 * Launcher
 * @role method laucnher & path manager
 */
export class Launcher {
  private ora: Ora;
  private _workingDir: string;
  private runner: Execa$;
  private log: Log;

  constructor() {
    this.ora = ora();
    this.ora.spinner = "arc";

    this._workingDir = ProjectUtil.getCurrentPath();

    this.runner = $;
    this.log = Log.getInstance("launcher");
  }

  get workingDir() {
    return this._workingDir;
  }

  set workingDir(path: string) {
    this._workingDir = `${ProjectUtil.getCurrentPath()}/${path}`;
  }

  public async run<T>({ info, magic }: INT_METHOD<T>) {
    this.ora.start(` ${info}`);

    try {
      const res = await this.runner({ cwd: this._workingDir, shell: true })`${magic}`;

      this.ora.succeed(` ${info}`);
      return res;
    } catch (error: any) {
      this.ora.fail(` ${info}`);
      throw new Error(error.message);
    }
  }

  public async runDirectCode({ info, func }: { info: string; func: Function }) {
    this.ora.start(` ${info}`);

    try {
      const res = await func();

      this.ora.succeed(` ${info}`);
      return res;
    } catch (error: any) {
      this.ora.fail(` ${info}`);
      throw new Error(error.message);
    }
  }
}
