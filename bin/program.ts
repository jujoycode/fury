import myPackage from '../package.json'
import { Command } from "commander";
import { Program } from "./src/interface/program";

export function Program() {
  const command = new Command()

  command
    .option("no option", "Start create project")
    .option("-push", "Commit&Push all changes", false)
    .name(myPackage.name)
    .version(myPackage.version)
    .description(myPackage.description)
    .parse();

  const options: Program = command.opts()

  return options
}