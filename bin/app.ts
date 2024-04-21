#!/usr/bin/env node

// package.json
// import myPackage from '../package.json'
// commander
// import { program } from 'commander'
// generator
import { Generator } from "./src/generator"
// interface
// import { ProgramOption } from './src/interface';

// program setting
// program
//   .name('fury')
//   .description(myPackage.description)
//   .option('no option', 'Start create project')
//   .option('-pa', 'Commit all changes', false)
//   .argument('[commitMessage]', '') //args[0]
//   .version(myPackage.version)
//   .parse()


// const options = program.opts<ProgramOption>();
// const args = program.args;

// program start
(async () => {
  try {
    await Generator()
    // switch (true) {
    //   case options.Pa: {
    //     console.log(args)
    //     break
    //   }
    //   default: {
    //     await Generator()
    //     break
    //   }
    // }
  }
  // global catch
  catch (error: any) {
    console.log('\n----------------- ⚠️  Error ⚠️  -----------------\n')
    console.error(error.message)
    console.log('\n-----------------------------------------------')
  }
})()