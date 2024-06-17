import * as esbuild from 'esbuild'

await esbuild
  .build({
    entryPoints: ['bin/index.ts'],
    outfile: 'dist/app.js',
    logLevel: 'info',
    bundle: true,
    minify: true,
    treeShaking: true,
    format: 'cjs',
    platform: 'node',
    target: 'node16'
  })
  .then(() => {
    console.log('')
  })
  .catch(() => process.exit(1))
