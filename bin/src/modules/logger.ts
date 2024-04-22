import { Base } from "../base";
import { Style } from "../interface";

export default class Logger extends Base {
  constructor() {
    super();
  }

  public system(sMessage: string) {
    let sLog = sMessage;
    console.log(sLog);
  }

  public debug(sMessage: string) {
    let sLog = sMessage;
    console.log(`ℹ️ ${sLog}`);
  }

  public info(sMessage: string) {
    let sLog = sMessage;
    console.log(sLog);
  }

  public error(error: any) {
    let name = error.sName ? error.sName : "System";
    let message = error.sMessage;
    let context = error.cError ? error.cError : this.setStyle("red", error);

    name = this.setStyle("red", `[${name}]`);

    console.log(name);
    if (message) {
      console.log(`→ ${this.setStyle("red", error.sMessage)}\n`);
    }
    console.log(context);
  }

  public success(sMessage: string) {
    let sLog = this.setStyle("green", sMessage);
    console.log(`✅ ${sLog}`);
  }

  public fail(sMessage: string) {
    let sLog = sMessage;
    console.log(`❌ ${sLog}`);
  }

  public line(sMessage?: string) {
    if (sMessage) {
      let sLog = "";
      // 원본 선이 47글자
      const iCount = 22 - (sMessage.length - 1) / 2;

      for (let i = 0; i < iCount; i++) {
        sLog += "-";
      }

      sLog += sMessage;

      for (let i = 0; i < iCount; i++) {
        sLog += "-";
      }

      console.log(`\n${this.setStyle("italic", sLog)}\n`);
    } else {
      console.log("\n-----------------------------------------------\n");
    }
  }

  public customLog(tStyle: Style, sMessage: string) {
    console.log(this.setStyle(tStyle, sMessage));
  }
}
