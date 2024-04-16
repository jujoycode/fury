#!/usr/bin/env node

// modules
import m_CLI from "./src/modules/cli";
import m_Launcher from "./src/modules/launcher";

// constant
import { CONFIG } from "./src/constants/config";
import { METHOD } from "./src/constants/method";

// model
import InputModel from "./src/models/inputModel";
import SelectModel from "./src/models/selectModel";

// init
const CLI = new m_CLI();
const Launcher = new m_Launcher();

async function app(): Promise<void> {
  // 1. node version, os check

  // 2. receive config data
  const projectName = await CLI.inputValue(InputModel.gen(CONFIG.PROJECT_NAME));
  const packageManager = await CLI.selectValue(SelectModel.gen(CONFIG.PACKAGE_MANAGER));
  const projectType = await CLI.selectValue(SelectModel.gen(CONFIG.PROJECT_TYPE));

  // 3. create Project
  const test = await Launcher.processRun(METHOD.TEST);
}

app();
