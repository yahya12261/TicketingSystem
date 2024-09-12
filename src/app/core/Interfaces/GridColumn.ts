import { InputType } from "../enums/InputTypes";

export interface GridColumn {
  header: string;
  field: string;
  type?: InputType;
  searchableField: boolean;
  searchList?: any; // Updated type to return an array
  searchListField?:(list:any)=>string;
  searchValue?: string;
  style?: (value:any)=>{
    [key: string]: string;
  };
  format?: (value: any) => any;
  actions?: (item: any) => Array<{ visible: (value: any) => boolean; label: string; action: (value: any) => void }>;
  visible: boolean;
  class?: string;
  selectQueryName?: string;
  searchOperation?:string;
  isOrderByField:boolean;
  isComplicated?:boolean;
}
