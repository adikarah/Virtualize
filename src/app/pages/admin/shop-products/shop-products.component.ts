import { Component, OnInit } from '@angular/core';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { WelcomeAdminService } from 'src/app/services/adminService/welcome-admin.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ProductData } from '../../../interfaces/product-data';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {
  product: ProductData[];
  productId: number = 1;
  productDetails: any
  change: boolean = false;
  productImageUrl = environment.productImageUrl;
  nameSearch: string = '';

  delProduct = {
    "adminId": 0,
    "productId": 0,
    "shopId": 0
  };

  adminStores = null;
  x: any
  t: any

  constructor(private loginService: LoginService, private wlcAdmService: WelcomeAdminService, private _product: ControlProductsService) { }

  ngOnInit(): void {
    this.change = true;
    this.adminStores = this.loginService.getUserCompleteDetail().adminShops;
    this.delProduct.adminId = this.loginService.getUserCompleteDetail().adminId;
    setTimeout(() => { this.change = false; }, 550);
  }

  availOffers(product, store) {
    localStorage.setItem('selectedProductId', product.productId)
    localStorage.setItem('selectedShopId', store.shopId)
    localStorage.setItem('selectedShopName', store.shopName)
    localStorage.setItem('selectedProductName', product.productName)
  }

  onUpdateProduct(product, store) {
    localStorage.setItem('selectedProductId', product.productId)
    localStorage.setItem('selectedShopId', store.shopId)
    localStorage.setItem('selectedShopName', store.shopName)
    localStorage.setItem('selectedProductName', product.productName)
  }

  onDeleteProduct(product, store) {
    this.delProduct.shopId = store.shopId;
    this.delProduct.productId = product.productId;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover your product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No',

    }).then((result) => {
      if (result.isConfirmed) {
        this._product.deleteProduct(this.delProduct).subscribe((data: any) => {
          localStorage.setItem('userDetail', JSON.stringify(data));
          // setTimeout(() => { window.location.reload(); }, 2000);
          setTimeout(() => { this.ngOnInit() }, 2000)
        },
          (error) => {
            // console.log(error);
            Swal.fire('Error !!', 'Server Error !!', 'error');
          }

        );
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })
  }

  searchProducts = () => {

    var input = (<HTMLInputElement>document.getElementById('myInput'));
    var filter = input.value.toUpperCase();
    var tab = document.getElementsByClassName('shop-Products');
    for (var i = 0; i < tab.length; i++) {
      var temp = tab[i];
      if (temp) {
        var textvalue = temp.textContent || temp.innerHTML;
        if (textvalue.toUpperCase().indexOf(filter) > -1) {
          (document.getElementsByClassName('shop-product-card') as HTMLCollectionOf<HTMLElement>)[i].style.display = "";
        }
        else {
          (document.getElementsByClassName('shop-product-card') as HTMLCollectionOf<HTMLElement>)[i].style.display = "None";
        }
      }
    }
  }
}
