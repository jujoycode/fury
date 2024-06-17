// interface
import { CLI_CONFIRM, CLI_INPUT, CLI_SELECT } from '../interface/cli'

export const CONFIG = {
  PROJECT_NAME: {
    message: 'Enter Project Name :',
    defaultValue: 'demo',
    validate: (param: string) => {
      if (/[\s]/g.test(param)) {
        return false
      } else {
        return true
      }
    }
  } as CLI_INPUT,

  PACKAGE_MANAGER: {
    question: 'Select a Package Manager :',
    choisOptions: [
      { name: 'npm', value: 'npm', style: 'redBright' },
      { name: 'yarn berry', value: 'yarn', style: 'cyanBright', disabled: true },
      { name: 'pnpm', value: 'pnpm', style: 'yellowBright' },
      { name: 'bun', value: 'bun', style: 'whiteBright', disabled: true }
    ]
  } as CLI_SELECT,

  PROJECT_LANG: {
    question: 'Select a Language for use :',
    choisOptions: [
      { name: 'Javascript', value: 'js', style: 'yellowBright' },
      { name: 'Typescript', value: 'ts', style: 'blueBright' }
    ]
  } as CLI_SELECT,

  FRAMEWORK_USAGE: {
    message: 'Whether to use framework :'
  } as CLI_CONFIRM,

  PROJECT_TEMPLATE: {
    question: 'Select a Template for Project :',
    choisOptions: [
      { name: 'React', value: 'react', style: 'blueBright' },
      { name: 'Vue', value: 'vue', style: 'green' },
      { name: 'Express', value: 'express', style: 'italic' },
      { name: 'Fastify', value: 'fastify', style: 'redBright' },
      { name: 'Electron', value: 'electron', style: 'cyanBright' }
    ]
  } as CLI_SELECT,

  GIT_USAGE: {
    message: 'Whether to use git :'
  } as CLI_CONFIRM,

  GIT_REPOSITORY_URL: {
    message: 'Enter Git Repository URL :',
    validate: (param: string) => {
      const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/)

      if (param === '') {
        return false
      }

      if (regExp.test(param)) {
        return true
      } else {
        return false
      }
    }
  } as CLI_INPUT,

  COMMIT_TYPE: {
    question: 'Select a Type of Commit :',
    choisOptions: [
      { name: '🚧 - Work in Progress', value: ':construction:' },
      { name: '✨ - New Feature', value: ':sparkles:' },
      { name: '🐛 - Bug Fix', value: ':bug:' },
      { name: '🔨 - Refactor Code', value: ':hammer:' },
      { name: '⚡️ - Performance', value: ':zap:' },
      { name: '💄 - Style', value: ':lipstick:' },
      { name: '➕ - New Dependency', value: ':heavy_plus_sign:' },
      { name: '📝 - Documentation', value: ':memo:' },
      { name: '✅ - Tests', value: ':white_check_mark:' },
      { name: '🏗️  - Build', value: ':building_construction:' },
      { name: '🚀 - Deploying', value: ':rocket:' },
      { name: '👷 - CI/CD', value: ':construction_worker:' },
      { name: '🐌 - Chore', value: '🐌' }
    ]
  } as CLI_SELECT,

  COMMIT_MESSAGE: {
    message: 'Enter Commit Message :',
    validate: (param: string) => {
      if (param !== '') {
        return true
      } else {
        return false
      }
    }
  } as CLI_INPUT,

  PUSH_PERMISION: {
    message: 'Do you want to push to Remote Repo? :'
  } as CLI_CONFIRM
}
