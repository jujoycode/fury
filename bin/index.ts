import { Program } from "./program";
import { Logger } from './src/utils/index'
import { Invoker, CLI } from "./src/core/index";
import { CreateProjectCommand } from './src/commands/index'

async function main() {
  const program = Program()
  const logger = new Logger()
  const invoker = new Invoker()
  const cli = new CLI(logger)

  logger.debug(`Program Start`)

  switch (true) {
    case program.Push: {

      break
    };

    default: {
      invoker.addCommand(new CreateProjectCommand(logger, cli))
      break
    };
  }

  await invoker.invoke()
}

main()