import { BaseModel } from "./baseModel";
import { ProjectInterface } from "../interface";

export default class ProjectModel extends BaseModel<ProjectInterface> {
  constructor(modelData: ProjectInterface) {
    super(modelData);
  }
}
