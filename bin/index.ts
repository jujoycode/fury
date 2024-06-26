#!/usr/bin/env node

// program
import { Program } from './program'

// core
import { Invoker, CLI } from './src/core'

// command
import { CreateProjectCommand, GitPushCommand } from './src/commands'

// util
import { Logger } from './src/utils'

async function main() {
  const program = Program()
  const logger = new Logger()
  const invoker = new Invoker()
  const cli = new CLI(logger)

  switch (true) {
    case program.Push: {
      invoker.addCommand(new GitPushCommand(logger, cli))
      break
    }

    default: {
      invoker.addCommand(new CreateProjectCommand(logger, cli))
      break
    }
  }

  await invoker.invoke()
}

main()
