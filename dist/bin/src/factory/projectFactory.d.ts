import { Factory } from '../interface/factory';
import { ProjectInfo } from '../interface/program';
export declare class ProjectFactory {
    private projectInfo;
    private workDir;
    constructor(projectInfo: ProjectInfo);
    getFactory(): Factory;
}
