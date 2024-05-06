import { BaseError } from "./baseError";

export class EmptyError extends BaseError {
  constructor(message?: string, context?: any) {
    super({
      context: context,
      title: "Empty Error",
      message: message,
    });
  }
}
