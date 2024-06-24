// factory
import { PlaneProjectFactory } from './planeProjectFactory'

// interface
import { Factory } from '../interface/factory'
import { ProjectInfo } from '../interface/program'
import { ReactProjectFactory } from './reactProjectFactory'

export class ProjectFactory {
  private projectInfo: ProjectInfo
  private workDir = process.cwd()

  constructor(projectInfo: ProjectInfo) {
    this.projectInfo = projectInfo
  }

  public getFactory(): Factory {
    switch (this.projectInfo.projectTemplate) {
      case 'react': {
        return new ReactProjectFactory(this.projectInfo, this.workDir)
      }

      case 'vue': {
      }

      case 'express': {
      }

      case 'fastify': {
      }

      case 'electron': {
      }

      default: {
        return new PlaneProjectFactory(this.projectInfo, this.workDir)
      }
    }
  }
}
