import { DateUtils } from "./DateUtils";
import { getNationalitiesArray } from "./Nationality";

interface searchList {
  id?:any,
  arabicLabel?:any
  value?:any
}
export class OptionList {
  static getListByName(name: string): searchList[] {
    switch (name) {
      case 'ruleType':
        return [
          { arabicLabel: 'BASE' },
          { arabicLabel: 'API' },
          { arabicLabel: 'PAGE' },
          { arabicLabel: 'SECTION' },
        ];
      case 'methodType':
        return [
          { arabicLabel: 'GET' },
          { arabicLabel: 'POST' },
          { arabicLabel: 'PATCH' },
          { arabicLabel: 'OPTION' },
          { arabicLabel: 'DELETE' },
        ];
      case 'activeInactive':
        return [
          { id: '1', arabicLabel: 'مفعل' },
          { id: '0', arabicLabel: 'غير مفعل' },
        ];
      case 'yesNo':
        return [
          { id: '1', arabicLabel: 'نعم' },
          { id: '0', arabicLabel: 'كلا' },
        ];
      case 'years':
        return [
          { id: '1', arabicLabel: 'نعم' },
          { id: '0', arabicLabel: 'كلا' },
        ];
      case 'gender':
        return [
          { arabicLabel: 'ذكر', value: 'male' },
          { arabicLabel: 'انثى', value: 'female' },
        ];
      case 'nationality':
       return getNationalitiesArray();
        case'inputTypes':
        return [
          {arabicLabel:'number'},{arabicLabel:'text'},
          {arabicLabel:'date'},{arabicLabel:'boolean'},
          {arabicLabel:'list'},{arabicLabel:'checkbox'},
        ]
    }
    return [];
  }
}
