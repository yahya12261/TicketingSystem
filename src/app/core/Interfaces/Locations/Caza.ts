import { BaseInterface } from "../BaseInterface";
import { IGovernment } from "./Government";


export interface ICaza extends BaseInterface {
  name?:string;
  government?:IGovernment;
  governmentId?:number;
}
