export const METHOD = {
  PACKAGE_INSTALL: {
    npm: "npm install --save",
    yarn: 'yarn',
    pnpm: 'pnpm install',
    bun: 'bun install'
  },

  GIT: 'git',
  GIT_INIT: 'git init',
  GIT_ADD_REMOTE: 'git remote add origin @',
  GIT_ADD_CHANGES: 'git add .',
  GIT_COMMIT_COMMAND: ['commit', '-m'],

  REMOVE_PROJECT: 'rm -rf @'
} 