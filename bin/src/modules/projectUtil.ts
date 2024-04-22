// interface
import { PROJECT_TYPE, PacakageTemplate, MakeJson } from "../interface";

// constants
import jsPackage from "../constants/templates/jsPackage.json";
import tsPackage from "../constants/templates/tsPackage.json";
import tsConfig from "../constants/templates/tsConfig.json";

// fs
import { mkdirSync, existsSync, writeFileSync } from "fs";
import { CONSTANT } from "../constants/constant";

export class ProjectUtil {
  constructor() {}

  /**
   * makeJson
   * @param projectName 프로젝트명
   * @param projectType 프로젝트가 사용할 언어의 종류 (js, ts)
   * @param packageManager 프로젝트가 사용할 패키지 메니저의 종류 (npm, yarn, pnpm)
   * @param filePath 프로젝트의 위치
   */
  static async makeJson(request: MakeJson) {
    let template = {} as PacakageTemplate;

    switch (request.projectType) {
      case "js": {
        template = JSON.parse(JSON.stringify(jsPackage));
        break;
      }
      case "ts": {
        template = JSON.parse(JSON.stringify(tsPackage));
        writeFileSync(
          `${request.filePath}/tsconfig.json`,
          JSON.stringify(tsConfig, null, 2),
          "utf-8"
        );
        break;
      }
    }

    template.name = request.projectName;
    template.packageManager = CONSTANT.DEFAULT_PACKAGE_MANAGER[request.packageManager];

    writeFileSync(`${request.filePath}/package.json`, JSON.stringify(template, null, 2), "utf-8");
  }

  /**
   * makeDefaultStructure
   * @param projectType 프로젝트가 사용할 언어의 종류 (js, ts)
   * @param filePath 프로젝트의 위치
   */
  static async makeDefaultStructure(projectType: PROJECT_TYPE, filePath: string) {
    mkdirSync(`${filePath}/bin`);
    mkdirSync(`${filePath}/bin/src`);
    writeFileSync(
      `${filePath}/bin/app.${projectType}`,
      `console.log('Happy Hack with fury🔥')`,
      "utf-8"
    );
  }

  /**
   * fileExistCheck
   * @desc 경로에 해당 파일이 존재하는지 확인합니다.
   * @param filePath 프로젝트의 위치
   * @result true | false
   */
  static fileExistCheck(filePath: string) {
    return existsSync(filePath);
  }
}
