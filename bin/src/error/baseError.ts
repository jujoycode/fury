import { Base } from "../core/base";

export class BaseError extends Base {
  public title?: string;
  public message?: string;
  public context: any;

  constructor({ context, title, message }: { context: string; title?: string; message?: string }) {
    super();

    this.context = this.setStyle("red", context);
    this.title = title;
    this.message = message;
  }
}
