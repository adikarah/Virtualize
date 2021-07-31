import { Pipe, PipeTransform } from '@angular/core';
import { WelcomeAdminService } from '../services/adminService/welcome-admin.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private welAdminService: WelcomeAdminService) { }

  transform(value: any, searchTerm: any): any {
    let temp = this.welAdminService.getSelectedShop()
    if (value.length === 0 || temp === null) {
      return value;
    }

    if (temp != null) {
      searchTerm = temp;
    }

    return value.filter(function (search) {
      return search.shopName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    })
  }
}
