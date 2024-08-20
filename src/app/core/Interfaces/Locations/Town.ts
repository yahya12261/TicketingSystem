import { BaseInterface } from "../BaseInterface";
import { ICaza } from "./Caza";


export interface ITown extends BaseInterface {
  name?:string;
  caza?:ICaza;
}
