#!/usr/bin/env node

// commander
import { createCommand } from 'commander'
// figlet
import { textSync } from 'figlet'
// generator
import { Generator } from "./src/generator"
// interface
import { ProgramOption } from './src/interface';

// program setting
const program = createCommand();


program
  .name('fury')
  .version('1.0.2')
  .description('Project generator for Node.js, supports various templates.')
  .option('no option', 'Start create project')
  .option('-pa', 'Commit all changes', false)
  .argument('[commitMessage]', '') //args[0]
  .parse();


const options = program.opts<ProgramOption>();
const args = program.args;

// program start
(async () => {
  try {
    console.log(`${textSync(`Fury - 1.0.2`)}\n`)
    switch (true) {
      case options.Pa: {
        console.log(args)
        break
      }
      default: {
        await Generator()
        break
      }
    }
  }
  // global catch
  catch (error: any) {
    console.log('\n---------------- ⚠️  Error ⚠️  ------------------\n')
    console.error(error.message)
    console.log('\n-----------------------------------------------')
  }
})()