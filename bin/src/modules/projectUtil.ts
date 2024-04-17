// interface
import { PACAKGE_MANAGER_TYPE, PROJECT_TYPE, PacakageTemplate } from "../interface";

// constants
import * as jsPackage from "../constants/templates/jsPackage.json";
import * as tsPackage from "../constants/templates/tsPackage.json";

// fs
import { mkdir, writeFile } from "fs/promises";
import { Constant } from "../constants/constant";

export class ProjectUtil {
  constructor() { }

  static async makePackageJson(
    projectName: string,
    projectType: PROJECT_TYPE,
    packageManager: PACAKGE_MANAGER_TYPE,
    filePath: string
  ) {
    const template = JSON.parse(
      JSON.stringify(projectType === "js" ? jsPackage : tsPackage)
    ) as PacakageTemplate;

    template.name = projectName;
    template.packageManager = Constant.DEFAULT_PACKAGE_MANAGER[packageManager];

    delete template.default;

    await writeFile(`${filePath}/package.json`, JSON.stringify(template, null, 2), "utf-8");
  }

  static async makeDefaultStructure(projectType: PROJECT_TYPE, filePath: string) {
    await mkdir(`${filePath}/bin`);
    await mkdir(`${filePath}/bin/src`);
    await writeFile(`${filePath}/bin/app.${projectType}`, `console.log('Happy Hack with fury🔥')`, "utf-8");
  }
}
