export declare class FileUtil {
    constructor();
    static joinPath(mainPath: string, subPath: string): string;
    static createFile(path: string, fileName: string, fileExtension: string, data: string): Promise<void>;
    static createFolder(folderName: string, path: string): Promise<void>;
    static checkExist(path: string): boolean;
    static createRecursiveFolder(folderStructure: Record<string, any>, rootPath: string): Promise<void>;
}
