import { writeFile, mkdir } from 'fs/promises';
import { existsSync, } from 'fs';
import { join } from 'path';

export class FileUtil {
  constructor() { }

  static joinPath(mainPath: string, subPath: string): string {
    return join(mainPath, subPath)
  }

  static async createFile(path: string, fileName: string, fileExtension: string, data: string): Promise<void> {
    await writeFile(`${path}/${fileName}.${fileExtension}`, data)
  }

  static async createFolder(folderName: string, path: string): Promise<void> {
    await mkdir(join(path, folderName))
  }

  static checkExist(path: string): boolean {
    return existsSync(path)
  }

  static async createRecursiveFolder(folderStructure: Record<string, any>, rootPath: string): Promise<void> {
    for (const key in folderStructure) {
      const value = folderStructure[key];

      // 값이 문자열인 경우 파일 생성
      if (typeof value === 'string') {
        await writeFile(`${rootPath}/${key}.${value}`, '');  // 빈 파일 생성
      }

      // 값이 객체인 경우 폴더 생성 및 재귀 호출
      if (typeof value === 'object') {
        const currentPath = join(rootPath, key);
        await mkdir(currentPath, { recursive: true });
        await FileUtil.createRecursiveFolder(value, currentPath);
      }
    }
  }
}