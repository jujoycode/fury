import { Spinner } from "../interface/factory";
export declare class ProjectUtil {
    protected ora: Spinner;
    constructor();
    getSpinner(): Spinner;
    processRun(text: string, func: Function): Promise<any>;
}
