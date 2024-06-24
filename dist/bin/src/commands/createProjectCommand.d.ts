import { BaseCommand } from './baseCommand';
import { type Logger } from '../utils';
import { type CLI } from '../core';
export declare class CreateProjectCommand extends BaseCommand {
    private CLI;
    private Launcher;
    private ProjectUtil;
    private projectInfo;
    private dataInputFlag;
    private alreadyExistFlag;
    constructor(logger: Logger, CLI: CLI);
    initialize(): Promise<void>;
    execute(): Promise<void>;
    finalize(): Promise<void>;
    undo(): Promise<void>;
}
