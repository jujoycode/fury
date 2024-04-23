// module
import m_Launcher from "./modules/launcher";
import m_CLI from "./modules/cli";
import m_Logger from "./modules/logger";

// init
const log = new m_Logger();
const CLI = new m_CLI();

// model
import ProjectModel from "./models/projectModel";

// constant
import { METHOD } from "./constants/method";
import { CONFIG } from "./constants/config";

// interface
import { GitInterface, GitType } from "./interface";
import { ProjectUtil } from "./modules/projectUtil";
import { NoFileError } from "./error/noFileError";

export async function Git(type: GitType, param?: string[]): Promise<void> {
  const bGitExist = ProjectUtil.fileExistCheck(`${process.cwd()}/.git`);
  if (!bGitExist) {
    throw new NoFileError("'.git' file is not found");
  }

  log.line(" ✨ Process Start ✨ ");

  switch (type) {
    case "pa":
      await pushAll();
      break;
  }

  log.line(" ✨ Process End ✨ ");
}

async function pushAll() {
  const commitType = await CLI.selectValue(CONFIG.COMMIT_TYPE);
  const commitMessage = await CLI.inputValue(CONFIG.COMMIT_MESSAGE);

  const gitModel = new ProjectModel<GitInterface>({
    commitMessage: `${commitType}ㅤ${commitMessage.split(" ").join("-")}`,
  });

  const Launcher = new m_Launcher(gitModel);

  await Launcher.processRun(METHOD.GIT_ADD_CHANGES);
  await Launcher.processRun(METHOD.GIT_COMMIT);

  const pushPermission = await CLI.confirmValue(CONFIG.PUSH_PERMISSION);

  if (pushPermission) {
    await Launcher.processRun(METHOD.GIT_PUSH);
  }
}
