import { type Color, type Modifiers } from "chalk";

// type
type Style = typeof Color | typeof Modifiers;
type PROJECT_TYPE = "js" | "ts";
type PACAKGE_MANAGER_TYPE = "npm" | "yarn" | "pnpm" | "bun";

// interface
interface InputInterface {
  message: string;
  defaultValue?: string;
  validate?: (param: string) => boolean | Promise<boolean | string>;
}

interface ConfirmInterface {
  message: string;
}

interface SelectInterface {
  question: string;
  choisOptions: {
    name: string;
    value: string;
    disabled?: boolean | string;
    style?: Style;
  }[];
}

interface ProjectInterface {
  projectName: string;
  packageManager: PACAKGE_MANAGER_TYPE;
  projectType: PROJECT_TYPE;
  gitUsage: boolean;
  gitRepoUrl?: string;
}

interface ReturnObj<T> {
  success: boolean;
  data?: T;
}

interface RunRequest<T> {
  name: string;
  run: () => Promise<T>;
}

interface ProcessRequest {
  processName: string;
  method: string;
  transform?: {
    target: string;
    source: keyof ProjectInterface;
  };
}

export {
  Style,
  PROJECT_TYPE,
  PACAKGE_MANAGER_TYPE,
  InputInterface,
  ConfirmInterface,
  SelectInterface,
  ProjectInterface,
  ReturnObj,
  RunRequest,
  ProcessRequest,
};
