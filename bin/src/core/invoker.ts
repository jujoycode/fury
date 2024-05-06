import { EmptyError } from "../error/emptyError";
import { Command } from "../interfaces/command";

export default class Invoker {
  private command: Command | null = null;

  constructor() { }

  public setCommand(command: Command): void {
    this.command = command;
  }

  public async excuteCommand(): Promise<void> {
    if (this.command === null) {
      throw new EmptyError('Command Empty', "Can not excute empty command")
    }

    await this.command!.execute();
    this.command = null
  }
}
