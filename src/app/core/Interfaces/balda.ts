import { BaseInterface } from "./base-interface";
import { Caza } from "./Locations/Caza";

export interface Baldas extends BaseInterface{
  arabicName:String,
  englishName:String,
  Caza:Caza
}
