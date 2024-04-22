import { BaseError } from "./baseError";

export class ProcessError extends BaseError {
  public sName: string;

  constructor(sMessage: string, cError: any) {
    super(400001, sMessage, cError);
    this.sName = "Process Error";
  }
}
