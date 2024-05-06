import type { GENERATE_METHOD } from "../constants/method";

type T_PACAKGE_MANAGER = "npm" | "pnpm";
type T_PROJECT_TEMPLATE = "js" | "ts";
type T_PROJECT_DATA = INT_PROJECT & { methods: typeof GENERATE_METHOD }

interface INT_PROJECT {
  projectName: string;
  packageManager: T_PACAKGE_MANAGER;
  prorjectTemplate: T_PROJECT_TEMPLATE;
  gitUsage: boolean;
  gitRepoUrl?: string;
}


export { T_PROJECT_TEMPLATE, T_PACAKGE_MANAGER, INT_PROJECT, T_PROJECT_DATA };
