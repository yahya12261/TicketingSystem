import { BaseInterface } from "../BaseInterface";
import { IStatusFlow } from "./StatusFlow";

export interface IStatus extends BaseInterface {
  name?:String;
  next?:IStatusFlow[]
  color?:String
}
