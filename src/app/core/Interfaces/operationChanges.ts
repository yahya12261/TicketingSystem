import { BaseInterface } from "./BaseInterface";
import { IPersonOperation } from "./PersonOperation";

export interface IOperationChanges extends BaseInterface {
    personOperation:IPersonOperation
  }
