import type { Logger } from "../utils";
export declare abstract class BaseCommand {
    protected logger: Logger;
    protected workDir: string;
    constructor(logger: Logger);
    abstract initialize(): Promise<void>;
    abstract execute(): Promise<void>;
    abstract finalize(): Promise<void>;
    abstract undo(): Promise<void>;
    run(): Promise<void>;
}
