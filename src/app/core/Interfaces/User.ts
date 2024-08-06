import { BaseInterface } from "./BaseInterface";
import { IPosition } from "./Position";


export interface IUser extends BaseInterface {
    first?: string;
    middle?: string;
    last?: string;
    email?: string;
    username?: string;
    password?: string;
    OTP?: number;
    isAdmin?: boolean;
    position?:IPosition;
    phoneNumber?:string;
    lastLogin?:Date;
}
