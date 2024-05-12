import type { BaseCommand } from "../commands/baseCommand";

export default class Invoker {
  private commands: BaseCommand[] = []

  constructor() {
  }

  public addCommand(command: BaseCommand) {
    this.commands.push(command)
  }

  public async invoke() {
    this.commands.forEach(async (command) => {

      try {
        await command.run()
      } catch (error) {
        console.error(error)
        await command.undo()
        console.log('Undo')
      }
    })
  }
}