export const METHOD = {
  PACKAGE_INSTALL: {
    npm: "npm install --save",
    yarn: 'yarn',
    pnpm: 'pnpm install',
    bun: 'bun install'
  },

  GIT_INIT: 'git init',
  GIT_ADD_REMOTE: 'git remote add origin @',

  REMOVE_PROJECT: 'rm -rf @'
} 