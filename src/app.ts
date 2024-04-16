// modules
import m_CLI from "./modules/cli";
import m_Launcher from "./modules/launcher";

// constant
import { CONFIG } from "./constants/config";
import { METHOD } from "./constants/method";

// model
import InputModel from "./models/inputModel";
import SelectModel from "./models/selectModel";
import FunctionModel from "./models/functionModel";

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
}

app();
