import { BaseCommand } from "./baseCommand";
import { FileUtil, type Logger } from "../utils";

import type { GitCommandType } from "../interface/gitCommand";
import { CLI, Launcher } from "../core";

export class GitPushCommand extends BaseCommand {
  private CLI: CLI;
  private Launcher: Launcher

  constructor(logger: Logger, CLI: CLI) {
    super(logger)
    this.CLI = CLI;
    this.Launcher = new Launcher()

    this.logger.debug("✨ New Command → GitPushCommand");
  }

  async initialize(): Promise<void> {
    // 0. .git 파일 확인
    const gitUsageFlag = FileUtil.checkExist(FileUtil.joinPath(this.workDir, '.git'))
    if (!gitUsageFlag) {
      throw new Error('This Project not use Git')
    }

    // 1. gitmoji 선택
    // 2. commit message 생성
  }

  async execute(): Promise<void> {
    // 1. 변경사항을 stage로 이동 (git add .)
    // 2. 메시지 등록 (git commit -m `${gitmoji} ${message}`)
  }

  async finalize(): Promise<void> {
    // 1. 원격 저장소 push 여부 확인
    // 2. 원격 저장소 push 실행 (git push)
  }

  async undo(): Promise<void> {
    // 1. 원격 저장소에 push 되지 않은 경우 (git reset HEAD)

    // 2. 원격 저장소에 push된 경우 (git reset --hard && git push --hard)
  }
}