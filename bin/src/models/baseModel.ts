import type CLI from "../core/cli";
import Log from "../utils/log";

abstract class BaseModel {
  protected CLI: CLI;
  private eventHandlers: { [eventName: string]: Function[] } = {};
  protected log: Log;

  constructor(CLI: CLI, modelName: string) {
    this.CLI = CLI;
    this.log = Log.getInstance(modelName);
  }

  public on(eventName: string, callback: Function) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(callback);
  }

  public emit(eventName: string, data?: any) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((callback) => callback(data));
    }
  }

  // 추상 메서드를 정의할 수 있습니다.
  abstract getData(): Promise<any>;
}

export default BaseModel;
