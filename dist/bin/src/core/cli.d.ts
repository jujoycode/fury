import { CLI_CONFIRM, CLI_INPUT, CLI_SELECT } from '../interface/cli';
import { Logger } from '../utils';
export default class CLI {
    protected logger: Logger;
    constructor(logger: Logger);
    getInputValue({ message, defaultValue, validate }: CLI_INPUT): Promise<string>;
    getConfirmValue({ message }: CLI_CONFIRM): Promise<boolean>;
    getSeletValue<T>({ question, choisOptions, type }: CLI_SELECT): Promise<T>;
}
