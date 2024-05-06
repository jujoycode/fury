import chalk from "chalk";
import { T_STYLE, T_STYLE_TYPE, T_CHALK } from "../interfaces/core.base";

export class Base {
  constructor() {}

  protected setStyle(style: T_STYLE, text: string) {
    return chalk[style](text);
  }

  protected getStyle(type: T_STYLE_TYPE): T_CHALK {
    let style: T_CHALK = chalk;

    switch (type) {
      case "error": {
        style = chalk.italic.white;
        break;
      }

      case "start": {
        style = chalk.italic.whiteBright
        break;
      }

      case 'end': {
        style = chalk.italic.yellowBright
        break;
      }
    }

    return style;
  }
}
