import chalk, { type Color, type Modifiers } from "chalk";

export default class Base {
  constructor() {}

  protected setStyle(colorOrStyle: typeof chalk.Color | typeof chalk.Modifiers, text: string) {
    return chalk[colorOrStyle](text);
  }
}

export interface inputInterface {
  message: string;
  defaultValue?: string;
}

export interface SelectInterface {
  question: string;
  choisOptions: {
    name: string;
    value: string;
    description?: string;
    disabled?: boolean | string;
    type?: never;
    style?: typeof Color | typeof Modifiers;
  }[];
}
