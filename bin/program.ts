// pacakge.json
import myPackage from "../package.json";

// commander
import { createCommand } from 'commander'

// interface
import { Program } from "./src/interfaces/program";

export function Program() {
    const program = createCommand();

    program
        .option("no option", "Start create project")
        .option("-pa", "Commit all changes", false)
        .name(myPackage.name)
        .version(myPackage.version)
        .description(myPackage.description)
        .parse();

    const options: Program = program.opts()
    const args = program.args;

    return {
        options,
        args
    }
}