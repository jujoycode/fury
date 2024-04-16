import { inputInterface, SelectInterface } from "../interface";

export const CONFIG = {
  PROJECT_NAME: {
    message: "Enter Project Name :",
    defaultValue: "demo",
  } as inputInterface,

  PACKAGE_MANAGER: {
    question: "Select a Package Manager :",
    choisOptions: [
      { name: "npm", value: "npm", style: "redBright" },
      { name: "yarn", value: "yarn", style: "cyanBright", disabled: true },
      { name: "pnpm", value: "pnpm", style: "yellowBright" },
      { name: "bun", value: "bun", style: "whiteBright", disabled: true },
    ],
  } as SelectInterface,

  PROJECT_TYPE: {
    question: "Select a Project Template :",
    choisOptions: [
      { name: "JavaScript", value: "js", style: "yellowBright" },
      { name: "TypeScript", value: "ts", style: "blueBright", disabled: true },
    ],
  } as SelectInterface,
};
