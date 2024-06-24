import type { BaseCommand } from '../commands/baseCommand';
export default class Invoker {
    private Logger;
    private commands;
    constructor();
    addCommand(command: BaseCommand): void;
    invoke(): Promise<void>;
}
