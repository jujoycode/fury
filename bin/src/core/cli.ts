// inquirer
import { input, confirm, select } from "@inquirer/prompts";

// interface
import { CLI_CONFIRM, CLI_INPUT, CLI_SELECT } from '../interface/cli';

// util
import { Logger } from "../utils";

export default class CLI {
  protected logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  public async getInputValue({ message, defaultValue, validate }: CLI_INPUT): Promise<string> {
    const answer = await input({
      message: this.logger.setStyle(["italic"], message),
      default: defaultValue,
      validate,
    });
    return answer;
  }

  public async getConfirmValue({ message }: CLI_CONFIRM): Promise<boolean> {
    const answer = await confirm({ message: this.logger.setStyle(["italic"], message) });
    return answer;
  }

  public async getSeletValue<T>({ question, choisOptions }: CLI_SELECT): Promise<T> {
    choisOptions.forEach((option) => {
      if (option.style) {
        option.name = this.logger.setStyle([option.style], `${option.name}`);
      }
    });

    const answer = (await select({
      message: this.logger.setStyle(["italic"], `${question}`),
      choices: choisOptions,
    })) as T;

    return answer;
  }
}
