#!/usr/bin/env node

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
  .argument("[commitMessage]", "") //args[0]
  .name("fury")
  .version("1.0.4")
  .description("Project generator for Node.js, supports various templates.")
  .parse();

const options = program.opts<ProgramOption>();
const args = program.args;

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
    log.line(" ⛔️ Error ⛔️ ");
    log.error(error);
    log.line();
  }
})();
