import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  change: boolean = false;

  discount = {
    "adminId": 0,
    "discountDescription": "",
    "discountName": "",
    "discountPercentage": 0,
    "endDate": null,
    "productId": "",
    "shopId": ""
  }

  selectedProduct = null
  selectedShop = null
  temp = null
  constructor(private _product: ControlProductsService, private _snack: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
    this.discount.adminId = this.loginService.getUserCompleteDetail().adminId;
    this.discount.productId = this.loginService.getSelectedProductId();
    this.discount.shopId = this.loginService.getSelectedShopId();
  }

  dateFormating(yyyy, mm, dd) {
    yyyy = yyyy.toString()
    mm = mm.toString()
    dd = dd.toString()
    return yyyy + "-" + mm + "-" + dd
  }

  formSubmit() {
    if (this.discount.discountName.trim() == '' || this.discount.discountName == null) {
      this._snack.open("Discount Name Required !!", 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.change = true;
    this.discount.endDate = this.dateFormating(this.temp.year, this.temp.month, this.temp.day)

    this._product.addDiscount(this.discount).subscribe((data: any) => {
      localStorage.setItem('userDetail', JSON.stringify(data));
      setTimeout(()=>{this.change = false; Swal.fire("Success !!", 'Offer Added Sucessfully', 'success');},2000);
    },
      (error) => {
        // console.log(error);
        setTimeout(()=>{this.change = false; Swal.fire('Error !!', 'Server Error !!', 'error');},2000);
      }
    );
  }

  cleared() {
    window.location.reload();
  }
}
