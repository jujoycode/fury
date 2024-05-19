import type { Style } from "./util";

interface CLI_INPUT {
  message: string;
  defaultValue?: string;
  validate?: (param: string) => boolean | Promise<boolean>;
}

interface CLI_CONFIRM {
  message: string;
}

interface CLI_SELECT {
  question: string;
  choisOptions: {
    name: string;
    value: string;
    description?: string;
    disabled?: boolean | string;
    style?: Style;
  }[];
  type?: 'select' | 'rawlist'
}

export {
  CLI_INPUT,
  CLI_CONFIRM,
  CLI_SELECT
}