import { BaseInterface } from "../BaseInterface";
import { IPosition } from "../Position";
import { IService } from "../Service";
import { IStatus } from "./Status";

export interface IStatusFlow extends BaseInterface {
  refStatus:IStatus,
  nextStatuses:IStatus[],
  position:IPosition,
  service:IService
}
