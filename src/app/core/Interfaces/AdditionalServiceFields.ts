
import { FieldTypes } from "../enums/FieldTypes";
import { IAdditionalServiceList } from "./AdditionalServiceList";
import { BaseInterface } from "./BaseInterface";
import { IService } from "./Service";
export interface IAdditionalServiceFields extends BaseInterface {
    service?:IService;
    fieldType?:FieldTypes;
    list?:IAdditionalServiceList[];
    isRequired?:boolean;
}
