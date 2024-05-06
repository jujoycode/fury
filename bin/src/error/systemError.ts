import { BaseError } from "./baseError";

export class SystemError extends BaseError {
  constructor(context: any, message?: string) {
    super({
      context: context,
      title: "System Error",
      message: message,
    });
  }
}
