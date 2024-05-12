// ora
import ora from "ora";

// factory
import { PlaneProjectFactory } from "./planeProjectFactory";

// interface
import { Factory, Spinner } from "../interface/factory";
import { ProjectInfo } from "../interface/program";

export class ProjectFactory {
  private projectInfo: ProjectInfo;
  private workDir = process.cwd()
  protected ora: Spinner

  constructor(projectInfo: ProjectInfo) {
    this.projectInfo = projectInfo;

    this.ora = ora()
    this.ora.spinner = 'arc'
  }

  protected spinner(text: string) {
    return this.ora.start(text)
  }

  public getFactory(): Factory {
    const factorySpinner = this.ora.render()

    switch (this.projectInfo.projectTemplate) {
      case "react": {
      }
      case "vue": {
      }
      case "express": {
      }
      case "fastify": {
      }
      case "electron": {
      }
      default: {
        return new PlaneProjectFactory(this.projectInfo, this.workDir, factorySpinner);
      }
    }
  }
}
