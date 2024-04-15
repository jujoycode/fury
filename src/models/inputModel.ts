import { BaseModel } from "./baseModel";
import { inputInterface } from "../interface";

export default class InputModel extends BaseModel<inputInterface> {
  constructor(modelData: inputInterface) {
    super(modelData);
  }

  static gen(modelData: inputInterface) {
    return new InputModel(modelData).getModel();
  }
}
