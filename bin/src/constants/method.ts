import { ProcessRequest } from "../interface";

export const METHOD = {
  CREATE_DIRECTORY: {
    processName: "Create Project Directory",
    method: "mkdir @",
    transform: {
      target: "@",
      source: "projectName",
    },
  } as ProcessRequest,

  INSTALL_MODULES: {
    processName: "Install Packages",
    method: "",
  } as ProcessRequest,

  GIT_INIT: {
    processName: "Init Git",
    method: "git init",
  } as ProcessRequest,

  GIT_ADD_REMOTE: {
    processName: "Setting Git Remote",
    method: "git remote add origin @",
    transform: {
      target: "@",
      source: "gitRepoUrl",
    },
  } as ProcessRequest,

  GIT_ADD_CHANGES: {
    processName: "Add All Changes to Staging",
    method: "git add .",
  } as ProcessRequest,

  GIT_COMMIT: {
    processName: "Commit Changes to Local Repo",
    method: `git commit -m 'fury_@'`,
    transform: {
      target: "@",
      source: "commitMessage",
    },
  } as ProcessRequest,

  GIT_PUSH: {
    processName: "Push Commit to Remote Repo",
    method: `git push`,
  } as ProcessRequest,
};
