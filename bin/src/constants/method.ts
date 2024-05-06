import { INT_PROJECT } from "../interfaces/model.project";
import { INT_METHOD } from "../interfaces/core.launcher";

export const GENERATE_METHOD = {
  CREATE_PROJECT_DIRECTORY: {
    info: "Create Project Directory",
    magic: "mkdir @",
    translate: "projectName",
  } as INT_METHOD<INT_PROJECT>,

  INIT_GIT: {
    info: "Init Git",
    magic: "git init",
  } as INT_METHOD<INT_PROJECT>,

  ADD_REMOTE_ORIGIN: {
    info: "Setting Git Remote",
    magic: "git remote add origin '@'",
    translate: "gitRepoUrl",
  } as INT_METHOD<INT_PROJECT>,
};
