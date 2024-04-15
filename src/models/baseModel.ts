import { Base } from "../base";

export class BaseModel<T extends object> extends Base {
  protected data: T;

  constructor(data: T) {
    super();
    this.data = data;
  }

  public getData<K extends keyof T>(objectKey: K): T[K] {
    return this.data[objectKey];
  }

  public setData<K extends keyof T>(objectKey: K, data: T[K]): void {
    this.data[objectKey] = data;
  }

  public getModel(): T {
    return this.data;
  }
}
