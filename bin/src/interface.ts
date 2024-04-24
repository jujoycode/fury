//TODO: interface명 정리 필요

import { type Color, type Modifiers } from "chalk";

// type
export type Style = typeof Color | typeof Modifiers;
export type PROJECT_TYPE = "js" | "ts";
export type PACAKGE_MANAGER_TYPE = "npm" | "yarn" | "pnpm" | "bun";
export type GitType = "pa";

export type ModelType = ProjectInterface | GitInterface;

// export interface
export interface InputInterface {
  message: string;
  defaultValue?: string;
  validate?: (param: string) => boolean | Promise<boolean | string>;
}

export interface ConfirmInterface {
  message: string;
}

export interface SelectInterface {
  question: string;
  choisOptions: {
    name: string;
    value: string;
    description?: string;
    disabled?: boolean | string;
    style?: Style;
  }[];
}

export interface ProjectInterface {
  projectName: string;
  packageManager: PACAKGE_MANAGER_TYPE;
  projectType: PROJECT_TYPE;
  gitUsage: boolean;
  gitRepoUrl?: string;
}

export interface GitInterface {
  commitMessage?: string;
}

export interface ReturnObj<T> {
  success: boolean;
  data?: T;
}

export interface RunRequest<T> {
  name: string;
  run: () => Promise<T>;
}

export interface ProcessRequest {
  processName: string;
  method: string;
  transform?: {
    target: string;
    source: keyof ModelType;
  };
}

export interface MakeJson {
  projectName: string;
  projectType: PROJECT_TYPE;
  packageManager: PACAKGE_MANAGER_TYPE;
  filePath: string;
}

export interface PacakageTemplate {
  name: string;
  version: string;
  description: string;
  packageManager: string;
  main: string;
  scripts: {
    build?: string;
    dev?: string;
    start: string;
  };
  keywords: string[];
  author: {
    name: string;
    email: string;
  };
  license: string;
  devDependencies: { [key: string]: string };
  dependencies: { [key: string]: string };
  default?: object;
}

export interface ProgramOption {
  Pa: boolean;
}
