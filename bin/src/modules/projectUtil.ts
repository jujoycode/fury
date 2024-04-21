// interface
import { PROJECT_TYPE, PacakageTemplate, MakeJson } from "../interface";

// constants
import jsPackage from "../constants/templates/jsPackage.json";
import tsPackage from "../constants/templates/tsPackage.json";
import tsConfig from "../constants/templates/tsConfig.json";

// fs
import { mkdir, writeFile } from "fs/promises";
import { CONSTANT } from "../constants/constant";



export class ProjectUtil {
  constructor() { }

  /**
   * makeJson
   * @param projectName 프로젝트명
   * @param projectType 프로젝트가 사용할 언어의 종류 (js, ts)
   * @param packageManager 프로젝트가 사용할 패키지 메니저의 종류 (npm, yarn, pnpm)
   * @param filePath 프로젝트의 위치
   */
  static async makeJson(request: MakeJson) {
    let template = {} as PacakageTemplate

    switch (request.projectType) {
      case "js": {
        template = JSON.parse(JSON.stringify(jsPackage))
        break;
      }
      case "ts": {
        template = JSON.parse(JSON.stringify(tsPackage))
        await writeFile(`${request.filePath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2), "utf-8");
        break;
      }
    }

    template.name = request.projectName;
    template.packageManager = CONSTANT.DEFAULT_PACKAGE_MANAGER[request.packageManager];

    await writeFile(`${request.filePath}/package.json`, JSON.stringify(template, null, 2), "utf-8");
  }

  /**
   * makeDefaultStructure
   * @param projectType 프로젝트가 사용할 언어의 종류 (js, ts)
   * @param filePath 프로젝트의 위치
   */
  static async makeDefaultStructure(projectType: PROJECT_TYPE, filePath: string) {
    await mkdir(`${filePath}/bin`);
    await mkdir(`${filePath}/bin/src`);
    await writeFile(
      `${filePath}/bin/app.${projectType}`,
      `console.log('Happy Hack with fury🔥')`,
      "utf-8"
    );
  }
}
