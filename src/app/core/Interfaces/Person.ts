import { Gender } from "../enums/Gender.enum"
import { Nationality } from "../enums/Nationality"
import { BaseInterface } from "./BaseInterface"
import { ICaza } from "./Locations/Caza"
import { IGovernment } from "./Locations/Government"


export interface IPerson extends BaseInterface {
     firstAr: string
     middleAr: string
     lastAr: string
     firstEn: string
     middleEn: string
     lastEn: string
     dob: Date
     Gender: Gender
     LID: string
     nationality: Nationality
     governmentAddress: IGovernment
     cazaAddress: ICaza
     townAddress: string
     phoneNumber : string;
     phoneNumberCode:string;
     fromMedical:boolean
     haveInsurance:boolean
     insuranceName:string
  }

  export enum IPersonFields {
    FirstAr = "firstAr",
    MiddleAr = "middleAr",
    LastAr = "lastAr",
    FirstEn = "firstEn",
    MiddleEn = "middleEn",
    LastEn = "lastEn",
    Dob = "dob",
    Gender = "gender",
    LID = "LID",
    Nationality = "nationality",
    GovernmentAddress = "governmentAddress",
    CazaAddress = "cazaAddress",
    TownAddress = "townAddress",
    PhoneNumber = "phoneNumber",
    PhoneNumberCode = "phoneNumberCode",
    FromMedical = "fromMedical",
    HaveInsurance = "haveInsurance",
    InsuranceName = "insuranceName"
}
