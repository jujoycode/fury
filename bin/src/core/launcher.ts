import { $ } from "execa";

export default class Launcher {
  private methods: string[] = []
  private cwd: string = process.cwd()

  constructor() { }

  public setWorkDir(path: string) {
    this.cwd = path
  }

  public setMethod(method: string) {
    this.methods.push(method)
  }

  public async runMethod() {
    for (let i = 0; i < this.methods.length; i++) {
      const method = this.methods[i];

      await $({ cwd: this.cwd })`${method}`
    }

    this.methods = []
  }

  public async runDirectMethod(method: string) {
    const res = await $({ cwd: this.cwd })`${method}`
    return res
  }

  public async runDetailMethod(method: string, option: string[]) {
    const res = await $(method, option)
    return res
  }
}