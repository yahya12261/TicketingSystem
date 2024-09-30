import { BaseInterface } from "./BaseInterface"
import { IOperationChanges } from "./operationChanges"
import { IOperationValues } from "./OperationValues"
import { IPerson } from "./Person"
import { IService } from "./Service"
import { IStatus } from "./Status/Status"
import { IUser } from "./User"


export interface IPersonOperation extends BaseInterface {
    service?:IService
    person?:IPerson
    status?:IStatus
    assignTo?:IUser
    reporter?:IUser
    operationsChanges?:IOperationChanges[]
    operationsValues?:IOperationValues[]
}
