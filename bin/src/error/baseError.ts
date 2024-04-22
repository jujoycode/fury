import { Base } from "../base";

export class BaseError extends Base {
  iErrorCode: number;
  sMessage: string;
  cError: any;

  constructor(iErrorCode: number, sMessage: string, cError: any) {
    super();
    this.iErrorCode = iErrorCode;
    this.sMessage = sMessage;
    this.cError = this.setStyle("red", cError);
  }
}
