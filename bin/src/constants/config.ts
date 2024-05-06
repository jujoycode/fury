// interface
import { CLI_CONFIRM, CLI_INPUT, CLI_SELECT } from "../interface/cli";

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
  } as CLI_INPUT,

  PACKAGE_MANAGER: {
    question: "Select a Package Manager :",
    choisOptions: [
      { name: "npm", value: "npm", style: "redBright" },
      { name: "yarn berry", value: "yarn", style: "cyanBright" },
      { name: "pnpm", value: "pnpm", style: "yellowBright" },
      { name: "bun", value: "bun", style: "whiteBright", disabled: true },
    ],
  } as CLI_SELECT,

  PROJECT_LANG: {
    question: "Select a Language for use :",
    choisOptions: [
      { name: "Javascript", value: "js", style: "yellowBright" },
      { name: "Typescript", value: "ts", style: "blueBright" },
    ],
  } as CLI_SELECT,

  PROJECT_TEMPLATE: {
    question: "Select a Template for Project :",
    choisOptions: [
      { name: "Plane", value: "plane", style: "grey" },
      { name: "React", value: "react", style: "blue" },
      { name: "Vue", value: "vue", style: "green" },
      { name: "Electron", value: "electron", style: "cyanBright" },
    ],
  } as CLI_SELECT,

  GIT_USAGE: {
    message: "Whether to use git :",
  } as CLI_CONFIRM,

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
  } as CLI_INPUT,
};
