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

export { Style, inputInterface, SelectInterface, PROJECT_TYPE, PACAKGE_MANAGER_TYPE };
