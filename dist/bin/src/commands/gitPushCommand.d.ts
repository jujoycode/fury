import { BaseCommand } from './baseCommand';
import { CLI } from '../core';
import { type Logger } from '../utils';
export declare class GitPushCommand extends BaseCommand {
    private CLI;
    private Launcher;
    private ProjectUtil;
    private gitPushInfo;
    constructor(logger: Logger, CLI: CLI);
    initialize(): Promise<void>;
    execute(): Promise<void>;
    finalize(): Promise<void>;
    undo(): Promise<void>;
}
