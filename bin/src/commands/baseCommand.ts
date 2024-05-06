import type { Logger } from "../utils";
import ora, { type Ora } from "ora";

export abstract class BaseCommand {
  protected logger: Logger;
  protected ora: Ora

  constructor(logger: Logger) {
    this.logger = logger;
    this.ora = ora()

    this.ora.spinner = 'arc'
  }

  abstract initialize(): Promise<void>;
  abstract execute(): Promise<void>;
  abstract finalize(): Promise<void>;

  abstract undo(): Promise<void>;

  public async run(): Promise<void> {
    await this.initialize();

    await this.execute();

    await this.finalize();
  }

  protected spinner(text: string) {
    return this.ora.start(text)
  }
}
