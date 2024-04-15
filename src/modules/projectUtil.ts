// fs
import { existsSync } from "fs";

export default class Util {
  static fs_exist(path: string): boolean {
    return existsSync(path);
  }
}
