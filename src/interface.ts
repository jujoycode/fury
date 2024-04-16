import { type Color, type Modifiers } from "chalk";

// type
type Style = typeof Color | typeof Modifiers;
type PROJECT_TYPE = "js" | "ts";
type PACAKGE_MANAGER_TYPE = "npm" | "yarn" | "pnpm" | "bun";

// interface
interface inputInterface {
  message: string;
  defaultValue?: string;
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
  setMethod?: (param: string) => string;
  setParam?: string;
  validation?: (param: string) => boolean;
  errorMessage?: string;
}

export {
  Style,
  PROJECT_TYPE,
  PACAKGE_MANAGER_TYPE,
  inputInterface,
  SelectInterface,
  ReturnObj,
  RunRequest,
  ProcessRequest,
};
