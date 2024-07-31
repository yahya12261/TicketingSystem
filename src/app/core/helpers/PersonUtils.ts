import { Person } from "../Interfaces/person";

export class PersonUtils{
  static getFullName(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.firstName} ${person.middleName} ${person.lastName}`;
    }
  }
  static getPhoneNumber(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.ConnectionNumber.personalNumber} ${person.ConnectionNumber.personalNumber_CODE} +`
    }
  }
  static getFistName(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.firstName}`;
    }
  }
  static getMiddleName(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.middleName}`;
    }
  }
  static getLastName(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.lastName}`;
    }
  }
  static getIdNumber(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.idNumber}`;
    }
  }
  static getGender(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.gender=='male'?'ذكر':'انثى'}`;
    }
  }
  static getDob(person:Person){
    if(person===undefined)
      return `خطأ في الأسم`;
    else{
      return `${person.dob}`;
    }
}
}
