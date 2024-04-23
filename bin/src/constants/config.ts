import { InputInterface, ConfirmInterface, SelectInterface } from "../interface";

export const CONFIG = {
  PROJECT_NAME: {
    message: "Enter Project Name :",
    defaultValue: "demo",
  } as InputInterface,

  PACKAGE_MANAGER: {
    question: "Select a Package Manager :",
    choisOptions: [
      { name: "npm", value: "npm", style: "redBright" },
      { name: "yarn berry", value: "yarn", style: "cyanBright" },
      { name: "pnpm", value: "pnpm", style: "yellowBright" },
      { name: "bun", value: "bun", style: "whiteBright", disabled: true },
    ],
  } as SelectInterface,

  PROJECT_TYPE: {
    question: "Select a Project Template :",
    choisOptions: [
      { name: "JavaScript", value: "js", style: "yellowBright" },
      { name: "TypeScript", value: "ts", style: "blueBright" },
    ],
  } as SelectInterface,

  GIT_USAGE: {
    message: "Whether to use git :",
  } as ConfirmInterface,

  GIT_REPOSITORY_URL: {
    message: "Enter Git Repository URL :",
    validate: (param: string) => {
      const regExp = new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/);

      if (param === "") {
        return false;
      }

      if (regExp.test(param)) {
        return true;
      } else {
        return false;
      }
    },
  } as InputInterface,

  PUSH_PERMISSION: {
    message: "Do you want push to remote repo? :",
  } as ConfirmInterface,

  COMMIT_TYPE: {
    question: "Select a Type of Commit :",
    choisOptions: [
      { name: "New feature", value: ":sparkles:", description: "→ 신규 기능 개발" },
      { name: "Bugfix", value: ":bug:", description: "→ 버그 수정" },
      { name: "Documentation", value: ":books:", description: "→ 문서 관련 수정" },
      { name: "Refactor code", value: ":hammer:", description: "→ 코드 리팩토링" },
      { name: "Performance", value: ":racehorse:", description: "→ 성능 개선" },
      { name: "Style", value: ":lipstick:", description: "→ 스타일 변경" },
      { name: "Work in progress", value: ":construction:", description: "→ 작업중인 사항" },
      { name: "Tests", value: ":white_check_mark:", description: "→ 테스트 관련 코드" },
      { name: "Build", value: "build", description: "→ 빌드 관련 파일 수정" },
      { name: "Deploying", value: ":rocket:", description: "→ 배포" },
      { name: "CI/CD", value: ":construction_worker:", description: "→ CI/CD 설정 파일 수정" },
    ],
  } as SelectInterface,

  COMMIT_MESSAGE: {
    message: "Enter Commit Message :",
    validate: (param: string) => {
      if (param !== "") {
        return true;
      } else {
        return false;
      }
    },
  } as InputInterface,
};
