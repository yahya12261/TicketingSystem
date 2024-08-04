import { MethodTypes } from "../enums/MethodTypes";
import { BaseInterface } from "./BaseInterface";
import { IPosition } from "./Position";


export interface IRule extends BaseInterface {
    name?:String,
    route?:String,
    code?:String,
    methodType?:MethodTypes,
    methodName?:String,
    position?:IPosition[]
  }
