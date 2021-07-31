import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    return value.filter(function (search) {
      return search.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

    });
  }

}
