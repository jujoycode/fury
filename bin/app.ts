#!/usr/bin/env node

// modules
import m_CLI from "./src/modules/cli";
import m_Launcher from "./src/modules/launcher";

// constant
import { CONFIG } from "./src/constants/config";
import { METHOD } from "./src/constants/method";

// model
import ProjectModel from "./src/models/projectModel";
import { ProjectUtil } from "./src/modules/projectUtil";
import { Constant } from "./src/constants/constant";

// init
const CLI = new m_CLI();

async function app(): Promise<void> {
  // 1. node version, os check

  // 2. receive config data
  const project = new ProjectModel({
    projectName: await CLI.inputValue(CONFIG.PROJECT_NAME),
    packageManager: await CLI.selectValue(CONFIG.PACKAGE_MANAGER),
    projectType: await CLI.selectValue(CONFIG.PROJECT_TYPE),
    gitUsage: await CLI.confirmValue(CONFIG.GIT_USAGE),
  });

  if (project.getData("gitUsage")) {
    project.setData("gitRepoUrl", await CLI.inputValue(CONFIG.GIT_REPOSITORY_URL));
  }

  const projectInfo = project.getModel();

  const Launcher = new m_Launcher(project);
  console.log("\n--------------- ✨ Process Start ✨ ---------------\n");

  // 3. create Project

  // create directory
  await Launcher.processRun(METHOD.CREATE_DIRECTORY);

  // setting working directory
  Launcher.setWorkDir(`/${projectInfo.projectName}`);

  // create package.json
  await Launcher.run<void>({
    name: "Init Package Manager",
    run: async () =>
      await ProjectUtil.makePackageJson(
        projectInfo.projectName,
        projectInfo.projectType,
        projectInfo.packageManager,
        Launcher.getWorkDir()
      ),
  });

  // gitUsage : git init
  if (projectInfo.gitUsage) {
    await Launcher.processRun(METHOD.GIT_INIT);
    await Launcher.processRun(METHOD.GIT_ADD_REMOTE);
  }

  // create default structure
  await Launcher.run<void>({
    name: "Create Project",
    run: async () =>
      await ProjectUtil.makeDefaultStructure(projectInfo.projectType, Launcher.getWorkDir()),
  });

  // install node_modules
  await Launcher.processRun({
    ...METHOD.INSTALL_MODULES,
    method: Constant.INSTALL_SCRIPT[projectInfo.packageManager],
  });

  Launcher.log("italic", "\n--------------- ✨ Process End ✨ ---------------\n");
  Launcher.log("white", "Get started with following commands :\n");
  Launcher.log("blue", `$ cd ${projectInfo.projectName}`);
  Launcher.log("blue", `$ ${projectInfo.packageManager} run dev`);
  Launcher.log("italic", "\n--------------- 🔥 Happy Hack! 🔥 ---------------");
}
app();
