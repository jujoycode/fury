// inquirer
import { input, confirm, select } from "@inquirer/prompts";

// base
import { Base } from "../core/base";

// interface
import { INT_CLI_CONFIRM, INT_CLI_INPUT, INT_CLI_SELECT } from "../interfaces/core.cli";

export default class CLI extends Base {
  constructor() {
    super();
  }

  public async getInputValue({ message, defaultValue, validate }: INT_CLI_INPUT): Promise<string> {
    const answer = await input({
      message: this.setStyle("italic", message),
      default: defaultValue,
      validate,
    });
    return answer;
  }

  public async getConfirmValue({ message }: INT_CLI_CONFIRM): Promise<boolean> {
    const answer = await confirm({ message: this.setStyle("italic", message) });
    return answer;
  }

  public async getSeletValue<T>({ question, choisOptions }: INT_CLI_SELECT): Promise<T> {
    // style option이 존재한다면, name에 style 적용
    choisOptions.forEach((option) => {
      if (option.style) {
        option.name = this.setStyle(option.style, `${option.name}`);
      }
    });

    const answer = (await select({
      message: this.setStyle("italic", `${question}`),
      choices: choisOptions,
    })) as T;

    return answer;
  }
}
