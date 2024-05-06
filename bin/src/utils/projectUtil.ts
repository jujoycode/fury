// fs
import { writeFileSync, mkdirSync } from "fs";

// template
import jsPackage from "../templates/js.package.json";
import tsPackage from "../templates/ts.package.json";
import tsConfig from "../templates/tsconfig.json";

// interface
import { T_PROJECT_TEMPLATE } from "../interfaces/model.project";

export class ProjectUtil {
  constructor() { }

  public static getCurrentPath() {
    return process.cwd();
  }

  public static async makeFile(filePath: string, data: string) {
    writeFileSync(filePath, data)
  }

  public static async makeDirectory(filePath: string) {
    mkdirSync(filePath)
  }

  /**
   * makeJson
   * @param projectName 프로젝트명
   * @param projectType 프로젝트가 사용할 언어의 종류 (js, ts)
   * @param packageManager 프로젝트가 사용할 패키지 메니저의 종류 (npm, yarn, pnpm)
   * @param filePath 프로젝트의 위치
   */
  public static async makeJson(
    projectTemplate: T_PROJECT_TEMPLATE,
    filePath: string,
    projectName: string
  ) {
    let template = {} as typeof jsPackage;

    switch (projectTemplate) {
      case "js": {
        template = JSON.parse(JSON.stringify(jsPackage));
        break;
      }
      case "ts": {
        template = JSON.parse(JSON.stringify(tsPackage));
        writeFileSync(`${filePath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2), "utf-8");
        break;
      }
    }

    template.name = projectName;

    writeFileSync(`${filePath}/package.json`, JSON.stringify(template, null, 2), "utf-8");
  }
}
