export const METHOD = {
  PACKAGE_INSTALL: {
    npm: ['install', '--save'],
    yarn: [],
    pnpm: ['install'],
    bun: ['install']
  },

  GIT: 'git',
  GIT_INIT: ['init'],
  GIT_ADD_REMOTE: ['remote', 'add', 'origin'],
  GIT_ADD_CHANGES: ['add', '.'],
  GIT_COMMIT_COMMAND: ['commit', '-m'],
  GIT_PUSH: ['push'],
  GIT_REVERT: ['revert', 'HEAD^'],
  GIT_RESET_HEAD: ['reset', 'HEAD^'],
  GIT_RESET: ['reset'],

  REMOVE: 'rm',
  REMOVE_ALL_OPTION: ['-rf']
}
