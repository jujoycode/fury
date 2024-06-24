import { Factory } from '../interface/factory';
import { ProjectInfo } from '../interface/program';
export declare class ReactProjectFactory implements Factory {
    private logger;
    private Launcher;
    private ProjectUtil;
    projectInfo: ProjectInfo;
    workDir: string;
    constructor(projectInfo: ProjectInfo, workDir: string);
    build(): Promise<void>;
}
