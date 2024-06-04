import { BaseCommand } from './baseCommand'
import { CLI, Launcher } from '../core'
import { FileUtil, ProjectUtil, type Logger } from '../utils'
import { CONFIG, METHOD } from '../constants'
import { GitPushInfo } from '../interface/gitCommand'

export class GitPushCommand extends BaseCommand {
  private CLI: CLI
  private Launcher: Launcher
  private ProjectUtil: ProjectUtil
  private gitPushInfo: GitPushInfo = {
    commitMessage: METHOD.GIT_COMMIT_COMMAND,
    pushPermision: false,
    stageFlag: false,
    commitFlag: false,
    pushFlag: false
  }

  constructor(logger: Logger, CLI: CLI) {
    super(logger)
    this.CLI = CLI
    this.Launcher = new Launcher()
    this.ProjectUtil = new ProjectUtil()
    this.gitPushInfo = {
      commitMessage: METHOD.GIT_COMMIT_COMMAND,
      pushPermision: false,
      stageFlag: false,
      commitFlag: false,
      pushFlag: false
    }
  }

  async initialize(): Promise<void> {
    this.logger.empty()

    // 0. .git 파일 확인
    const gitUsageFlag = FileUtil.checkExist(FileUtil.joinPath(this.workDir, '.git'))
    if (!gitUsageFlag) {
      throw new Error('This Project not use Git')
    }

    // 1. gitmoji 선택
    const gitmoji = await this.CLI.getSeletValue<string>(CONFIG.COMMIT_TYPE)

    // 2. commit message 생성
    const message = await this.CLI.getInputValue(CONFIG.COMMIT_MESSAGE)

    // 3. setting
    this.gitPushInfo.commitMessage.push(`${gitmoji} ${message}`)

    // 4. 원격 저장소 push 여부 확인
    this.gitPushInfo.pushPermision = await this.CLI.getConfirmValue(CONFIG.PUSH_PERMISION)

    this.logger.empty()
  }

  async execute(): Promise<void> {
    // 1. 변경사항을 stage로 이동 (git add .)
    await this.ProjectUtil.processRun(
      'Stage All Changes',
      async () => await this.Launcher.runDetailMethod(METHOD.GIT, METHOD.GIT_ADD_CHANGES)
    )
    this.gitPushInfo.stageFlag = true

    // 2. 메시지 등록 (git commit -m `${gitmoji} ${message}`)
    await this.ProjectUtil.processRun(
      'Commit Changes',
      async () => await this.Launcher.runDetailMethod(METHOD.GIT, this.gitPushInfo.commitMessage)
    )
    this.gitPushInfo.commitFlag = true
  }

  async finalize(): Promise<void> {
    // 1. 원격 저장소 push 실행 (git push)
    if (this.gitPushInfo.pushPermision) {
      this.gitPushInfo.pushFlag = true

      await this.ProjectUtil.processRun(
        'Push Commit to Remote Repo',
        async () => await this.Launcher.runDetailMethod(METHOD.GIT, METHOD.GIT_PUSH)
      )
    }
  }

  async undo(): Promise<void> {
    // 0. Reset Method
    this.Launcher.clear()

    let rollbackCommand: string[]

    // 1. Revert Remote Push
    if (this.gitPushInfo.pushFlag) {
      rollbackCommand = METHOD.GIT_REVERT
    }
    // 2. Reset Local Commit
    else if (this.gitPushInfo.commitFlag) {
      rollbackCommand = METHOD.GIT_RESET_HEAD
    }
    // 3. Unstaging
    else if (this.gitPushInfo.stageFlag) {
      rollbackCommand = METHOD.GIT_RESET
    }

    await this.ProjectUtil.processRun(
      'Reset Previouse Commit',
      async () => await this.Launcher.runDetailMethod(METHOD.GIT, rollbackCommand)
    )

    this.logger.info(`Rollback End, Please Troubleshoot and Try again`)
  }
}
