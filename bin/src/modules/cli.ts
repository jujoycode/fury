// inquirer
import { input, select } from "@inquirer/prompts";

// project
import { Base } from "../base";
import { inputInterface, SelectInterface } from "../interface";

export default class CLI extends Base {
  constructor() {
    super();
  }

  public async inputValue({ message, defaultValue }: inputInterface): Promise<string> {
    const answer = await input({
      message: this.setStyle("italic", `${message}`),
      default: defaultValue,
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
