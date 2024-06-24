export const METHOD = {
  PACKAGE_INSTALL: {
    npm: ['install', '--save'],
    yarn: [],
    pnpm: ['install'],
    bun: ['install']
  },

  FRAMEWORK: {
    REACT: {
      npm: ['init', 'react-app'],
      yarn: ['create', 'react-app'],
      pnpm: ['create', 'react-app'],
      TEMPLATE: '--template',
    }
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
  REMOVE_ALL_OPTION: ['-rf'],

  NODE_MODULES: 'node_modules',
  LOCK: {
    npm: 'package-lock.json',
    pnpm: 'pnpm-lock.yaml'
  }
}
