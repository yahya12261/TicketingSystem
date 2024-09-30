import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string, desc: boolean = false): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];
      if (aValue < bValue) {
        return desc ? 1 : -1;
      } else if (aValue > bValue) {
        return desc ? -1 : 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
