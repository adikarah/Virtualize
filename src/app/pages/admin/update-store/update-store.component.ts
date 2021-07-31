import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { StoresService } from 'src/app/services/adminService/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.scss']
})
export class UpdateStoreComponent implements OnInit {
  change: boolean = false;
  updShop = {
    "adminId": 0,
    "shopId": '',
    "shopLocation": "",
    "shopName": ""
  }

  selectedShop = null;
  selectedShopName = null;
  constructor(private _store: StoresService, private _snack: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
    this.updShop.adminId = this.loginService.getUserCompleteDetail().adminId;
    this.updShop.shopId = this.loginService.getSelectedShopId();
    this.selectedShopName = this.loginService.getSelectedShopName();
    this.updShop.shopName=this.selectedShopName;
    // console.log(this.selectedShop, "shashank")
  }
  formSubmit() {
    if (this.updShop.shopName.trim() == '' || this.updShop.shopName == null) {
      this._snack.open("Shop Name Required !!", 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.change = true;
    this._store.updateStore(this.updShop).subscribe(
      (data: any) => {
        localStorage.setItem('userDetail', JSON.stringify(data));
        setTimeout(()=>{this.change = false; Swal.fire("Success !!", 'Store Updated Sucessfully', 'success');},2000);
      },
      (error) => {
        // console.log(error);
        setTimeout(()=>{this.change = false; Swal.fire('Error !!', 'Server Error !!', 'error');},2000);
      }
    );
  }
}
