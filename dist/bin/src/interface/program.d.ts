interface Program {
    Push: boolean;
}
type PackageManager = "npm" | "pnpm";
type ProjectLanguage = "js" | "ts";
type projectTemplate = "default" | "react" | "vue" | "express" | "fastify" | "electron";
interface ProjectInfo {
    projectName: string;
    packageManager: PackageManager;
    projectLanguage: ProjectLanguage;
    projectTemplate: projectTemplate;
    frameworkUsage?: boolean;
    gitUsage: boolean;
    gitRepoUrl?: string;
}
export { Program, PackageManager, ProjectLanguage, projectTemplate, ProjectInfo };
