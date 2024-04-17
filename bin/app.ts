#!/usr/bin/env node

// modules
import m_CLI from "./src/modules/cli";
import m_Launcher from "./src/modules/launcher";

// constant
import { CONFIG } from "./src/constants/config";
import { METHOD } from "./src/constants/method";
import * as jsPackage from "./src/constants/templates/jsPackage.json";
import * as tsPackage from "./src/constants/templates/jsPackage.json";

// model
import ProjectModel from "./src/models/projectModel";

// init
const CLI = new m_CLI();

async function app(): Promise<void> {
  // 1. node version, os check

  // 2. receive config data
  const projectInfo = new ProjectModel({
    projectName: await CLI.inputValue(CONFIG.PROJECT_NAME),
    packageManager: await CLI.selectValue(CONFIG.PACKAGE_MANAGER),
    projectType: await CLI.selectValue(CONFIG.PROJECT_TYPE),
    gitUsage: await CLI.confirmValue(CONFIG.GIT_USAGE),
  });

  if (projectInfo.getData("gitUsage")) {
    projectInfo.setData("gitRepoUrl", await CLI.inputValue(CONFIG.GIT_REPOSITORY_URL));
  }

  console.log("\n--------------- Process Start ---------------\n");

  // 3. create Project
  const Launcher = new m_Launcher(projectInfo);
  await Launcher.processRun(METHOD.MAKE_DIRECTORY);
}

app();
