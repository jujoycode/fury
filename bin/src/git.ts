// module
import m_Launcher from "./modules/launcher";
import m_CLI from "./modules/cli";
import m_Logger from "./modules/logger";

// model
import ProjectModel from "./models/projectModel";

// constant
import { METHOD } from "./constants/method";
import { CONFIG } from "./constants/config";

// interface
import { GitInterface, GitType } from "./interface";
import { ProjectUtil } from "./modules/projectUtil";
import { NoFileError } from "./error/noFileError";

export async function Git(type: GitType, param: string[]): Promise<void> {
  // pre-process, param parsing
  const objInfo: GitInterface = {
    commitMessage: param[0],
  };

  // init
  const gitModel = new ProjectModel<GitInterface>(objInfo);
  const Launcher = new m_Launcher(gitModel);
  const CLI = new m_CLI()
  const log = new m_Logger()

  // .git check
  const bGitExist = ProjectUtil.fileExistCheck(`${Launcher.getWorkDir()}/.git`);

  if (!bGitExist) {
    throw new NoFileError(".git file not exist");
  }

  log.line(" ✨ Process Start ✨ ");

  switch (type) {
    case "pa":
      await pushAll(Launcher, CLI);
      break;
  }

  log.line(" ✨ Process End ✨ ");
}

async function pushAll<T extends GitInterface>(Launcher: m_Launcher<T>, CLI: m_CLI) {
  await Launcher.processRun(METHOD.GIT_ADD_CHANGES);
  await Launcher.processRun(METHOD.GIT_COMMIT);

  const pushPermission = await CLI.confirmValue(CONFIG.PUSH_PERMISSION)

  if (pushPermission) {
    await Launcher.processRun(METHOD.GIT_PUSH);
  }
}
