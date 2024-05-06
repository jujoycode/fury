interface Program {
  Push: boolean
}

type PackageManager = "npm" | "pnpm";
type ProjectLanguage = "js" | "ts";
type projectTemplate = "plane" | "react" | "vue" | "electron";

interface ProjectInfo {
  projectName: string;
  packageManager: PackageManager;
  projectLanguage: ProjectLanguage;
  projectTemplate: projectTemplate;
  gitUsage: boolean;
  gitRepoUrl?: string;
}


export { Program, PackageManager, ProjectLanguage, projectTemplate, ProjectInfo };
