import { BaseCommand } from "./baseCommand";
import { FileUtil, type Logger } from "../utils";

import type { GitCommandType } from "../interface/gitCommand";
import { CLI, Launcher } from "../core";

export class GitCommand extends BaseCommand {
  private CLI: CLI;
  private type: GitCommandType
  private Launcher: Launcher

  constructor(logger: Logger, CLI: CLI, type: GitCommandType) {
    super(logger)
    this.CLI = CLI;
    this.type = type
    this.Launcher = new Launcher()
  }

  async initialize(): Promise<void> {
    // 1. .git 파일 확인
    const gitUsageFlag = FileUtil.checkExist(FileUtil.joinPath(this.workDir, '.git'))
    if (!gitUsageFlag) {
      throw new Error('This Project not use Git')
    }
  }

  async execute(): Promise<void> {
    // 1. 변경사항을 stage로 이동

    // 2. commit message 생성

  }

  async finalize(): Promise<void> {

  }

  async undo(): Promise<void> {

  }
}