import chalk from "chalk";
import { Style } from "./interface";

export class Base {
  constructor() {}

  protected setStyle(style: Style, text: string) {
    return chalk[style](text);
  }
}
