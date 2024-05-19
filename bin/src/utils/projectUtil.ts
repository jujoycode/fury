import ora from "ora";

import { Spinner } from "../interface/factory";

export class ProjectUtil {
  protected ora: Spinner
  constructor() {
    this.ora = ora()
    this.ora.spinner = 'arc'
  }

  public getSpinner(): Spinner {
    return this.ora.render()
  }

  public async processRun(text: string, func: Function) {
    const spn = this.ora.start(` ${text}...`)

    try {
      const result = await func()

      spn.succeed(` ${text}`)
      return result
    } catch (error: any) {
      spn.fail(` ${text}`)
      throw new Error(error.message)
    }

  }
}