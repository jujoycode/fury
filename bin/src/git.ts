// module
import m_Launcher from "./modules/launcher";

// model
import ProjectModel from "./models/projectModel";

// constant
import { METHOD } from "./constants/method";

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
  const gitInfo = gitModel.getModel();

  const Launcher = new m_Launcher(gitModel);

  // .git check
  const bGitExist = ProjectUtil.fileExistCheck(`${Launcher.getWorkDir()}/.git`);

  if (!bGitExist) {
    throw new NoFileError(".git file not exist");
  }

  switch (type) {
    case "pa":
      await pushAll(gitInfo, Launcher);
      break;
  }
}

async function pushAll<T extends GitInterface>(gitInfo: T, Launcher: m_Launcher<T>) {
  await Launcher.processRun(METHOD.GIT_ADD_CHANGES);
}
