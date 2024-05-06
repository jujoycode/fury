import * as esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: ["bin/index.ts"],
    outfile: "dist/bundle.js",
    logLevel: "debug",
    bundle: true,
    minify: true,
    treeShaking: true,
    format: "cjs",
    platform: "node",
    target: "node16",
  })
  .catch(() => process.exit(1));
