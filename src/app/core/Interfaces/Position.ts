import { BaseInterface } from "./BaseInterface";
import { IDepartment } from "./Department";

export interface IPosition extends BaseInterface {
    name:String
    department:IDepartment
  }