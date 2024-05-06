// interface
import { INT_CLI_CONFIRM, INT_CLI_INPUT, INT_CLI_SELECT } from "../interfaces/core.cli";

export const CONFIG = {
  PROJECT_NAME: {
    message: "Enter Project Name :",
    defaultValue: "demo",
    validate: (param: string) => {
      if (/[\s]/g.test(param)) {
        return false;
      } else {
        return true;
      }
    },
  } as INT_CLI_INPUT,

  PACKAGE_MANAGER: {
    question: "Select a Package Manager :",
    choisOptions: [
      { name: "npm", value: "npm", style: "redBright" },
      { name: "yarn berry", value: "yarn", style: "cyanBright" },
      { name: "pnpm", value: "pnpm", style: "yellowBright" },
      { name: "bun", value: "bun", style: "whiteBright", disabled: true },
    ],
  } as INT_CLI_SELECT,

  PROJECT_TYPE: {
    question: "Select a Project Template :",
    choisOptions: [
      { name: "JavaScript", value: "js", style: "yellowBright" },
      { name: "TypeScript", value: "ts", style: "blueBright" },
    ],
  } as INT_CLI_SELECT,

  GIT_USAGE: {
    message: "Whether to use git :",
  } as INT_CLI_CONFIRM,

  GIT_REPOSITORY_URL: {
    message: "Enter Git Repository URL :",
    validate: (param: string) => {
      const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/);

      if (param === "") {
        return false;
      }

      if (regExp.test(param)) {
        return true;
      } else {
        return false;
      }
    },
  } as INT_CLI_INPUT,
};
