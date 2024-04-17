// inquirer
import { input, select, confirm } from "@inquirer/prompts";

// project
import { Base } from "../base";
import { InputInterface, ConfirmInterface, SelectInterface } from "../interface";

export default class CLI extends Base {
  constructor() {
    super();
  }

  public async inputValue({ message, defaultValue, validate }: InputInterface): Promise<string> {
    const answer = await input({
      message: this.setStyle("italic", `${message}`),
      default: defaultValue,
      validate,
    });

    return answer;
  }

  public async confirmValue({ message }: ConfirmInterface): Promise<boolean> {
    const answer = await confirm({
      message: this.setStyle("italic", `${message}`),
    });

    return answer;
  }

  public async selectValue<T>({ question, choisOptions }: SelectInterface): Promise<T> {
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
