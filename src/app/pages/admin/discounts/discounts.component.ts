import { Component, OnInit } from '@angular/core';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  change: boolean = false;
  constructor(private loginService: LoginService, private _product: ControlProductsService) { }

  delDiscount = {
    "adminId": 0,
    "discountId": 0,
    "discountName": "string",
    "productId": 0,
    "shopId": 0
  }

  productDiscounts = null;
  adminStores = null;
  selectedShopName = null;
  selectedProductName = null;

  ngOnInit(): void {
    this.change = true;
    this.adminStores = this.loginService.getUserCompleteDetail().adminShops;
    this.delDiscount.adminId = this.loginService.getUserCompleteDetail().adminId;
    this.delDiscount.productId = parseInt(this.loginService.getSelectedProductId());
    this.delDiscount.shopId = parseInt(this.loginService.getSelectedShopId());
    this.selectedShopName = this.loginService.getSelectedShopName()
    this.selectedProductName = this.loginService.getSelectedProductName()
    // console.log(this.delDiscount);
    setTimeout(() => { this.change = false; }, 350);

    for (var i = 0; i < this.adminStores.length; i++) {
      if (this.adminStores[i].shopId === parseInt(this.loginService.getSelectedShopId())) {
        for (var j = 0; j < this.adminStores[i].shopProducts.length; j++) {
          if (this.adminStores[i].shopProducts[j].productId === parseInt(this.loginService.getSelectedProductId())) {
            this.productDiscounts = this.adminStores[i].shopProducts[j].productDiscounts;
            break;
          }
        }
      }
    }
  }

  onDeleteDiscount(discount) {
    this.delDiscount.discountId = discount.discountId
    this.delDiscount.discountName = discount.discountName

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover your offer !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'DELETE',
      cancelButtonText: 'NO',

    }).then((result) => {
      if (result.isConfirmed) {
        this._product.deleteDiscount(this.delDiscount).subscribe(
          (data: any) => {
            localStorage.setItem('userDetail', JSON.stringify(data));
            setTimeout(() => { window.location.reload(); }, 2000);
          },
          (error) => {
            // console.log(error);
            Swal.fire('Error !!', 'Server Error !!', 'error');
          }

        );
        Swal.fire(
          'Deleted!',
          'Your offer has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your offer is safe :)',
          'error'
        )
      }
    })
  }
}
