import { BaseModel } from "./baseModel";
import { ModelType } from "../interface";

export default class ProjectModel<T extends ModelType> extends BaseModel<T> {
  constructor(modelData: T) {
    super(modelData);
  }
}
