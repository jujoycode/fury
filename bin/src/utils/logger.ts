import { Style, ChalkInstance } from "../interface/util";
import { Chalk } from "chalk";
import moment from "moment";

export class Logger {
  protected chalk: ChalkInstance

  constructor() {
    this.chalk = new Chalk()
  }

  public setStyle(Styles: Style[], text: string) {
    Styles.forEach((style) => {
      text = this.chalk[style](text)
    })

    return text
  }

  private getLogInfo() {
    const date = moment().format("y-MM-DD HH:mm:ss");

    return this.setStyle(["gray"], `${date} |`);
  }

  public empty() {
    console.log()
  }

  public debug(text: string) {
    const prefix = this.setStyle(["cyan"], "debug");
    console.log(`${this.getLogInfo()} ${prefix} | ${text}`);
  }

  public info(text: string) {
    const prefix = this.setStyle(["blueBright"], "info");
    console.log(`${this.getLogInfo()} ${prefix} | ${text}`);
  }

  public error(text: string) {
    const prefix = this.setStyle(["red"], "ERROR");
    console.log(`${this.getLogInfo()} ${prefix} | ${text}`);
  }

  public start(text: string) {
    console.log(`${this.getLogInfo()} 📢 ${this.setStyle(["italic", "yellowBright"], text)}`);
  }

  public success(text: string) {
    console.log(`${this.getLogInfo()} ✅ ${this.setStyle(["italic", "greenBright"], text)}`);
  }
}
