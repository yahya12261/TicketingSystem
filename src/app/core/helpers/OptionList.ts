interface searchList {
  id?:any,
  arabicLabel?:any
}
export class OptionList{

  static getListByName(name:string):searchList[]{
    switch(name){
      case "ruleType":
         return [
          { arabicLabel: 'BASE' },
          { arabicLabel: 'API' },
          { arabicLabel: 'PAGE' },
          { arabicLabel: 'SECTION' },
        ];
       case "methodType":
        return [
          { arabicLabel: 'GET' },
          { arabicLabel: 'POST' },
          { arabicLabel: 'PATCH' },
          { arabicLabel: 'OPTION' },
          { arabicLabel: 'DELETE' },
        ];
    }
    return [];
  }

}
