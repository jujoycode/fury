import { BaseModel } from "./baseModel";
import { SelectInterface } from "../interface";

export default class SelectModel extends BaseModel<SelectInterface> {
  constructor(modelData: SelectInterface) {
    super(modelData);

    this.data.choisOptions.forEach((option) => {
      if (option.style) {
        option.name = this.setStyle(option.style, `${option.name}`);
      }
    });
  }

  static gen(modelData: SelectInterface) {
    return new SelectModel(modelData).getModel();
  }
}
