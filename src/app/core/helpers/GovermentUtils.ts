import { Baldas } from "../Interfaces/balda";

export class GovermentUtils{
  static getGovFromBalda(value:any):string{

    if(value?.Balda?.Caza?.Government?.arabicName)
   return value.Balda.Caza.Government.arabicName+""
  return "خطا"
  }
  static getCazaFromBalda(value:any):string{
    if(value?.Balda?.Caza?.arabicName)
   return value.Balda.Caza.arabicName+""
  return "خطا"
  }
  static getBaldaNameFromBalda(value:any):string{
    if(value?.Balda?.arabicName)
   return value.Balda.arabicName+""
  return "خطا"
  }
  static getRegNumFromBalda(value:any):string{
    if(value?.registrationNumber)
   return value.registrationNumber+""
  return "خطا"
  }
  static getPersonAddress(value:any):string{

   return `${value?.Government?.arabicName}-${value?.Caza?.arabicName}-${value?.balda}-ملك-${value?.building}-طابق-${value?.floor}`
  // return "خطا"
  }

  static getGovermentAddress(value:any):string{
    return `${value?.Government?.arabicName}`;
  }
  static getCazaAddress(value:any):string{
    return `${value?.Caza?.arabicName}`;
  }
  static getBaldaAddress(value:any):string{
    return `${value?.balda}`;
  }

}
