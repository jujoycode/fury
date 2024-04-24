#!/usr/bin/env node

// pacakge.json
import myPackage from "../package.json";
// commander
import { createCommand } from "commander";
// generator
import { Generator } from "./src/generator";
// interface
import { ProgramOption } from "./src/interface";
// logger
import Logger from "./src/modules/logger";
import { Git } from "./src/git";

// init
const log = new Logger();
const program = createCommand();

program
  .option("no option", "Start create project")
  .option("-pa", "Commit all changes", false)
  .name(myPackage.name)
  .version(myPackage.version)
  .description(myPackage.description)
  .parse();

const options = program.opts<ProgramOption>();
const args = program.args;

//FIXME: 구조 변경 필요
// program start
(async () => {
  try {
    switch (true) {
      case options.Pa: {
        await Git("pa", args);
        break;
      }
      default: {
        await Generator();
        break;
      }
    }
  } catch (error: any) {
    // global catch
    log.line(" ㅤ⛔️ Error ⛔️ㅤ ");
    log.error(error);
    log.line();

    //TODO: Rollback 방안 필요
    // ex) 프로젝트 생성 실패 시 해당 폴더 삭제 처리
    // ex) puahAll 실패 시, stage 전체 취소 처리
  }
})();
