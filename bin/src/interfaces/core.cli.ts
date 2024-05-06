import { T_STYLE } from "./core.base";

interface INT_CLI_INPUT {
    message: string;
    defaultValue?: string;
    validate?: (param: string) => boolean | Promise<boolean>;
}

interface INT_CLI_CONFIRM {
    message: string;
}

interface INT_CLI_SELECT {
    question: string;
    choisOptions: {
        name: string;
        value: string;
        description?: string;
        disabled?: boolean | string;
        style?: T_STYLE;
    }[];
}

export {
    INT_CLI_INPUT,
    INT_CLI_CONFIRM,
    INT_CLI_SELECT
}