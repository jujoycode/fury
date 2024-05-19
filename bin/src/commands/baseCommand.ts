import type { Logger } from "../utils";

export abstract class BaseCommand {
  protected logger: Logger;
  protected workDir: string;

  constructor(logger: Logger) {
    this.logger = logger;
    this.workDir = process.cwd()
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

}
