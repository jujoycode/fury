import { $, execa } from 'execa'

export default class Launcher {
  private method: string = ''
  private cwd: string = process.cwd()

  constructor() { }

  public setWorkDir(path: string) {
    this.cwd = path
  }

  public async run(method: string, option: string[]) {
    const res = await execa(method, option, { cwd: this.cwd })
    return res
  }
}
