import { BaseCommand } from "./baseCommand"
import { CLI, Launcher } from "../core"
import { FileUtil, ProjectUtil, type Logger } from "../utils"
import { CONFIG, METHOD } from "../constants"
import { GitPushInfo } from "../interface/gitCommand"

export class GitPushCommand extends BaseCommand {
  private CLI: CLI
  private Launcher: Launcher
  private ProjectUtil: ProjectUtil
  private gitPushInfo: GitPushInfo = {
    commitMessage: METHOD.GIT_COMMIT_COMMAND,
    stageFlag: false,
    commitFlag: false,
    pushFlag: false
  }

  constructor(logger: Logger, CLI: CLI) {
    super(logger)
    this.CLI = CLI
    this.Launcher = new Launcher()
    this.ProjectUtil = new ProjectUtil()
  }

  async initialize(): Promise<void> {
    this.logger.empty()

    // 0. .git 파일 확인
    const gitUsageFlag = FileUtil.checkExist(FileUtil.joinPath(this.workDir, ".git"))
    if (!gitUsageFlag) {
      throw new Error("This Project not use Git")
    }

    // 1. gitmoji 선택
    const gitmoji = await this.CLI.getSeletValue<string>(CONFIG.COMMIT_TYPE)

    // 2. commit message 생성
    const message = await this.CLI.getInputValue(CONFIG.COMMIT_MESSAGE)

    // 3. 원격 저장소 push 여부 확인
    const pushPermision = await this.CLI.getInputValue(CONFIG.PUSH_PERMISION)


    // 3. setting
    this.gitPushInfo.commitMessage.push(`${gitmoji} ${message}`)

    this.logger.empty()
  }

  async execute(): Promise<void> {
    // 1. 변경사항을 stage로 이동 (git add .)
    await this.ProjectUtil.processRun(
      "Stage All Changes",
      async () => await this.Launcher.runDirectMethod(METHOD.GIT_ADD_CHANGES)
    )
    this.gitPushInfo.stageFlag = true

    // 2. 메시지 등록 (git commit -m `${gitmoji} ${message}`)
    await this.ProjectUtil.processRun(
      "Commit Changes",
      async () => await this.Launcher.runDetailMethod(METHOD.GIT, this.gitPushInfo.commitMessage)
    )
    this.gitPushInfo.commitFlag = true
  }

  async finalize(): Promise<void> {
    // 1. 원격 저장소 push 여부 확인
    const pushPermision = await this.CLI.getConfirmValue(CONFIG.PUSH_PERMISION)

    // 2. 원격 저장소 push 실행 (git push)
    if (pushPermision) {
      this.gitPushInfo.pushFlag = true

      this.Launcher.setMethod(METHOD.GIT_PUSH)
      await this.ProjectUtil.processRun(
        "Push Commit to Remote Repo",
        async () => await this.Launcher.runMethod()
      )
    }
  }

  async undo(): Promise<void> {
    // 1. stageFlag? 
    // 2. commitFlag?
    // 3. pushFlag?
  }
}
