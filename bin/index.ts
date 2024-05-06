#!/usr/bin/env node

import { Program } from "./program";

// core
import m_CLI from "./src/core/cli";
import m_Invoker from "./src/core/invoker";

// command
import { GenerateCommand } from "./src/commands/generate.command";
import { SystemError } from "./src/error/systemError";

// util
import Log from "./src/utils/log";

// --- main ---

async function main() {
  // 0. init
  const Invoker = new m_Invoker();
  const CLI = new m_CLI()

  const log = Log.getInstance("index");
  const { options, args } = Program();

  // 1. Make Process
  switch (true) {
    case options.Pa:
      break;
    default:
      Invoker.setCommand(new GenerateCommand(CLI));
      break;
  }

  // 2. Process Excute
  try {
    await Invoker.excuteCommand();
  } catch (error: any) {
    if (!error.title) {
      error = new SystemError(error, error.message);
    }
    log.error(error);
  }
}

main();
