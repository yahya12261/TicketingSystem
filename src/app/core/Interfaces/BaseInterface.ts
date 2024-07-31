import { EntityType } from "../enums/EntityType";
import { IUser } from "./User";

export  interface BaseInterface{
    id?:number,
    uuid?:string,
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date,
    version?:number,
    dsc?:string,
    type?:EntityType,
    isActive?:boolean,
    arabicLabel?:string,
    note?:string,
    createdBy?:IUser,
    modifiedBy?:IUser,
    deletedBy?:IUser,
}