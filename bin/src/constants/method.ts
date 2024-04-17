import { ProcessRequest } from "../interface";

export const METHOD = {
  MAKE_DIRECTORY: {
    processName: "Make Project Directory",
    method: "mkdir @",
    transform: {
      target: "@",
      source: "projectName",
    },
  } as ProcessRequest,
};
