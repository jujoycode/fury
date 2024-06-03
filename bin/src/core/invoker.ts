import { Logger } from "../utils";
import type { BaseCommand } from "../commands/baseCommand";

export default class Invoker {
  private Logger: Logger
  private commands: BaseCommand[] = []

  constructor() {
    this.Logger = new Logger()
  }

  public addCommand(command: BaseCommand) {
    this.commands.push(command)
  }

  public async invoke() {
    this.commands.forEach(async (command) => {

      try {
        await command.run()
      } catch (error: any) {
        this.Logger.debug(`Rollback Process...`)
        this.Logger.error(`${error.message}`)
        await command.undo()
      }
    })
  }
}