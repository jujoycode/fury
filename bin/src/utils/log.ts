// lib
import { createConsola, type ConsolaInstance } from "consola";
import moment from "moment";
//core
import { Base } from "../core/base";
// constant
import { Context } from "../constants/values";
// error
import { BaseError } from "../error/baseError";

export default class Log extends Base {
  private static instance: Log;
  public log: ConsolaInstance;

  private constructor() {
    super();

    this.log = createConsola({
      level: Context.env === "dev" ? 5 : 3,
    });

    this.debug("New Log Instance!");
  }

  public static getInstance(caller: string) {
    if (!Log.instance) {
      Log.instance = new Log();
    }

    this.instance.debug(`Get Log Instance by [${caller}]`);
    return Log.instance;
  }

  private getDefaultFormat() {
    const dateFormat = moment().format("y-MM-DD HH:mm:ss");
    const pid = process.pid

    return `${dateFormat} [${pid}]`;
  }

  // --- dev ---

  public debug(message: string) {
    message = `${this.getDefaultFormat()}[FRAMEWORK] ${message}`;
    this.log.debug(message);
  }

  // --- publish ---

  public info(message: string) {
    message = `${this.getDefaultFormat()}[INFO] ${message}`;
    this.log.info(message);
  }

  public start(message: string) {
    const startStyle = this.getStyle("start");

    message = `${this.getDefaultFormat()} 📢 ${startStyle(`${message} Start`)} 📢`;
    console.log("\n");
    this.log.info(message);
  }

  public end(message: string) {
    const endStyle = this.getStyle("end");

    message = `${this.getDefaultFormat()} ⭐️ ${endStyle(`${message} End`)} ⭐️`;
    this.log.info(message);
    console.log("\n");
  }

  public error(error: BaseError) {
    const errorStyle = this.getStyle("error");

    this.log.error(`${this.getDefaultFormat()} ${errorStyle(error.title)}`);
    this.log.box(`→ ${error.message ? error.message : "No Message"} \n\n ${error.context}`);
  }
}
