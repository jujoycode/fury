import { BaseError } from "./baseError";

export class NoFileError extends BaseError {
  public sName: string;

  constructor(sMessage: string, cError?: any) {
    super(400002, sMessage, cError);
    this.sName = "No File Error";
  }
}
