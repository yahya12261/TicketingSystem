import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseService } from '../../services/BaseService/base.service';
import { GridColumn } from '../../Interfaces/GridColumn';
import { InputType } from '../../enums/InputTypes';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/ToastService/toast.service';
import { GridUtils } from '../../helpers/GridUtils';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent<T> implements OnInit {
  @Input() pageSize: number = 10;

  @Input() columns: GridColumn[] = [];

  @Input() BaseService!: BaseService<T>;

  @Input() GridOrder: string = "";

  @Input() gridName:string = "";

  @Input() path:string = "";
   // Declare baseService property
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  filteredData: any[] = []

  searchQuery: any = {};

  currentPage: number = 1;

  totalPages: number = 0;

  noData = false;

  columnCache : GridColumn[] =[];

  fieldOrder:string = "";

  orderASC:boolean = false;

  searchQueryString = "";

  constructor(    private spinner: NgxSpinnerService, private toast:ToastService ) { }

  ngOnInit() {
    this.loadData();
    this.loadGridOptionFromCache()
  }

  comparisonOptions = [
    {  label: 'EQUAL', arabicLabel: 'يساوي' },
    {  label: 'NOT_EQUAL', arabicLabel: 'لا يساوي' },
    {  label: 'GREATER_THAN', arabicLabel: 'أكبر من' },
    {  label: 'GREATER_THAN_OR_EQUAL', arabicLabel: 'أكبر من أو يساوي' },
    {  label: 'LESS_THAN', arabicLabel: 'أقل من' },
    {  label: 'LESS_THAN_OR_EQUAL', arabicLabel: 'أقل من أو يساوي' },
    {  label: 'LIKE', arabicLabel: 'يحتوي' },
    {  label: 'ILIKE', arabicLabel: 'يحتوي (غير حساس لحالة الأحرف)' },
    {  label: 'NOT_LIKE', arabicLabel: 'لا يحتوي' },
    {  label: 'NOT_ILIKE', arabicLabel: 'لا يحتوي (غير حساس لحالة الأحرف)' },
    {  label: 'BEGINS_WITH', arabicLabel: 'يبدأ بـ' },
    {  label: 'ENDS_WITH', arabicLabel: 'ينتهي بـ' },
    {  label: 'IN', arabicLabel: 'في' },
    {  label: 'NOT_IN', arabicLabel: 'ليس في' },
    {  label: 'BETWEEN', arabicLabel: 'بين' },
    {  label: 'NOT_BETWEEN', arabicLabel: 'ليس بين' },
    {  label: 'IS', arabicLabel: 'يعادل' },
    {  label: 'IS_NOT', arabicLabel: 'لا يعادل ' },
    ];

    onChangeSearchList(column:GridColumn){
      // searchQueryString
      if(column.isComplicated){
        this.searchQueryString = GridUtils.filterFieldsFromString(this.searchQueryString,[column.selectQueryName+"",column.selectQueryName+"OP"])
        this.loadData(this.searchQueryString);
      }else{

      }
    }
  getArabicName(label: any): string {
      const option = this.comparisonOptions.find((option) => option.label === label);
      return option ? option.arabicLabel : '';
    }

    saveGridOptionToCache(): void {
      localStorage.setItem(this.gridName, JSON.stringify(this.columns));
    }
    loadGridOptionFromCache(): void {
      const value = localStorage.getItem(this.gridName);
      if (value) {
        const cachedColumns: any[] = JSON.parse(value);
        if (cachedColumns.length === this.columns.length) {
          for (let i = 0; i < cachedColumns.length; i++) {
            this.columns[i].visible = cachedColumns[i].visible;
            this.columns[i].searchOperation = cachedColumns[i].searchOperation;
          }
        }
      }
      this.saveGridOptionToCache()
    }
    onSearch(field: string | undefined, fieldCustom: string | undefined, value: string | undefined, operator: string | undefined) {
      if (fieldCustom === '' || !fieldCustom || fieldCustom === undefined)
        fieldCustom = field;
      if (fieldCustom !== undefined) {
        if (!this.searchQuery) {
          this.searchQuery = {};
        }
        if (!value || value === undefined|| value ==="null"||value===null) {
          delete this.searchQuery[fieldCustom];
        } else {
          this.searchQuery[fieldCustom] = value;
        }
        this.currentPage = 1;
        // debugger;
        const searchQueryString = Object.keys(this.searchQuery)
          .map((key) => `${key}=${this.searchQuery[key]}&${key}OP=${this.getOperationByField(key)}`)
          .join('&');
        this.loadData(searchQueryString);
        this.searchQueryString = searchQueryString;
        this.search.emit(searchQueryString);
      }
    }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData(this.searchQueryString);
    }
  }
  searchListField(column: any, list: any): any {
    return column.searchListField(list);
  }
  getColumnSearchListName(column: any, searchValue: any): string {

    const list = column.searchList?.find((item: { arabicLabel: string }) => item?.arabicLabel === searchValue);
    return list ? list.arabicLabel : '';
  }
  getOperationByField(field:any):string | undefined{
    const option = this.columns?.find((option) => option.selectQueryName === field);
    return option ? option.searchOperation : '';
  }
  getInputType(type : InputType  | undefined):string{
    if(typeof(type) === undefined)
      return "";
    else if(type ===InputType.TEXT)
      return "text";
    else if(type ===InputType.NUMBER)
      return "number";
    else if(type ===InputType.DATE)
      return "date";
    return "";
  }

  @ViewChild('selectDropdown') selectDropdown!: ElementRef;

  dropdownVisible = false;

  actionDropDownVisible = false;
  selectedItem: any;

  toggleDropdownAction(item: any): void {
    this.selectedItem = item;
    this.actionDropDownVisible = !this.actionDropDownVisible;
  }

  isDropdownVisible(item: any): boolean {
    return this.actionDropDownVisible && this.selectedItem === item;
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  loadData(query?:string) {
    this.spinner.show();

    if(query===undefined){
      query='';
      this.getOrderBy(undefined);
    }

    this.BaseService.getAll(this.currentPage, this.pageSize,`?${query}${query?"&":""}${this.GridOrder}`,this.path)

    .subscribe(data => {
      const dynamicField = this.BaseService.type as keyof typeof data;
      this.filteredData = data.data.data ;
      console.log(this.filteredData)
      this.totalPages = Math.ceil(data.data.total/data.data.pageSize);
      this.noData=this.totalPages===0
      this.spinner.hide();
    },error=>{
      this.toast.showError(error.error.massage)
      this.spinner.hide();
    });
  }
  getOrderBy(column:string| undefined){

   if(column !== undefined&&this.orderASC){
    this.orderASC = !this.orderASC;
    this.fieldOrder=column;
      this.GridOrder = `orderBy=${column}&order=ASC`
   }else if(column !== undefined&&!this.orderASC){
    this.fieldOrder=column;
    this.orderASC = !this.orderASC;
      this.GridOrder =`orderBy=${column}&order=DESC`
    }else if(column===undefined){
      this.GridOrder = `${this.GridOrder}`;
    }
  }
  onOrderClick(column:any){
    this.getOrderBy(column);
    this.loadData(this.searchQueryString);
  }


  clearFilter() {
    this.columns.forEach((data) => {
        data.searchValue=undefined;
    });
    this.loadData();
    this.searchQueryString="";
    this.search.emit("");
  }
  syncScroll(event: Event): void {
    const scrollContainer = event.target as HTMLElement;
    const scrollContent = scrollContainer.querySelector('.scroll-content') as HTMLElement;
    scrollContent.scrollLeft = scrollContainer.scrollLeft;
  }


}
