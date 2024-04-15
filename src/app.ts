// modules
import m_CLI from "./modules/cli";

// config
import { TEMPLATE } from "./constants/config";

// model
import InputModel from "./models/inputModel";
import SelectModel from "./models/selectModel";

// init
const CLI = new m_CLI();

async function app(): Promise<void> {
  // 1. node version, os check

  // 2. receive config data
  const projectName = await CLI.inputValue(InputModel.gen(TEMPLATE.PROJECT_NAME));
  const packageManager = await CLI.selectValue(SelectModel.gen(TEMPLATE.PACKAGE_MANAGER));
  const projectType = await CLI.selectValue(SelectModel.gen(TEMPLATE.PROJECT_TYPE));

  // 3. create Project
}

app();
