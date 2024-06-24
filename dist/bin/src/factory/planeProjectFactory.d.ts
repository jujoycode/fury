import { Factory } from '../interface/factory';
import { ProjectInfo } from '../interface/program';
export declare class PlaneProjectFactory implements Factory {
    private logger;
    private ProjectUtil;
    projectInfo: ProjectInfo;
    workDir: string;
    constructor(projectInfo: ProjectInfo, workDir: string);
    build(): Promise<void>;
}
