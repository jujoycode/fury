import { Style, ChalkInstance } from "../interface/util";
export declare class Logger {
    protected chalk: ChalkInstance;
    constructor();
    setStyle(Styles: Style[], text: string): string;
    private getLogInfo;
    empty(): void;
    debug(text: string): void;
    info(text: string): void;
    error(text: string): void;
    start(text: string): void;
    success(text: string): void;
}
