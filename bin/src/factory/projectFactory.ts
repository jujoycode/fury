// factory
import { PlaneProjectFactory } from "./planeProjectFactory";

// interface
import { Factory } from "../interface/factory";
import { ProjectInfo } from "../interface/program";

export class ProjectFactory {
  private projectInfo: ProjectInfo;
  private workDir = process.cwd()

  constructor(projectInfo: ProjectInfo) {
    this.projectInfo = projectInfo;
  }

  public getFactory(): Factory {
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
        return new PlaneProjectFactory(this.projectInfo, this.workDir);
      }
    }
  }
}
