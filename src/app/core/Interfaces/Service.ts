import { BaseInterface } from "./BaseInterface";
import { IUser } from "./User";


export interface IService extends BaseInterface {
    name?:String,
    reporter?:IUser;
  }
