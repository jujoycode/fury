import Base from "./base";
import { existsSync } from "fs";

export default class Util extends Base {
  constructor() {
    super();
  }

  public fs_exist(path: string) {
    return existsSync(path);
  }
}
