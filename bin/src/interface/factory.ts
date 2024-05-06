import { ProjectInfo } from "./program"

interface Factory {
  projectInfo: ProjectInfo
  workDir: string
  build(): Promise<void>
}

export {
  Factory
}