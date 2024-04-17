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

  INSTALL_MODULES: {
    processName: "Install",
    method: "",
  } as ProcessRequest,
};
