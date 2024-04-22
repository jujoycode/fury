import { InputInterface, ConfirmInterface, SelectInterface } from "../interface";

export const CONFIG = {
  PROJECT_NAME: {
    message: "Enter Project Name :",
    defaultValue: "demo",
  } as InputInterface,

  PACKAGE_MANAGER: {
    question: "Select a Package Manager :",
    choisOptions: [
      { name: "npm", value: "npm", style: "redBright" },
      { name: "yarn berry", value: "yarn", style: "cyanBright" },
      { name: "pnpm", value: "pnpm", style: "yellowBright" },
      { name: "bun", value: "bun", style: "whiteBright", disabled: true },
    ],
  } as SelectInterface,

  PROJECT_TYPE: {
    question: "Select a Project Template :",
    choisOptions: [
      { name: "JavaScript", value: "js", style: "yellowBright" },
      { name: "TypeScript", value: "ts", style: "blueBright" },
    ],
  } as SelectInterface,

  GIT_USAGE: {
    message: "Whether to use git :",
  } as ConfirmInterface,

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
  } as InputInterface,

  PUSH_PERMISSION: {
    message: "Do you want push to remote repo? :",
  } as ConfirmInterface,
};
