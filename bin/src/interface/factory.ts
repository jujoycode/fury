import { ProjectInfo } from "./program"
import { type Ora } from "ora";

type Spinner = Ora

interface Factory {
  projectInfo: ProjectInfo
  workDir: string
  build(): Promise<void>
}

export {
  Factory,
  Spinner
}