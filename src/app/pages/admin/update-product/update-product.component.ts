import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/LoginService/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  change: boolean = false;
  categories = [];
  temp: any;
  admin = null;
  selectedProductName = null;
  selectedShopName = null;

  updProduct = {
    "adminId": 0,
    "brandName": "",
    "categoryType": "",
    "productDescription": "",
    "productId": 0,
    "productImage": "",
    "productName": "",
    "productPrice": 0,
    "productType": "",
    "shopId": 0
  }

  url = "https://image.flaticon.com/icons/png/512/2345/2345301.png";
  selectedFile = null;

  constructor(private _product: ControlProductsService, private _snack: MatSnackBar, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.updproduct = this._product.getUpdatedProduct();
    this.admin = this.loginService.getUserCompleteDetail();
    this.updProduct.adminId = this.loginService.getUserCompleteDetail().adminId;
    this.updProduct.shopId = parseInt(this.loginService.getSelectedShopId());
    this.updProduct.brandName = this.loginService.getSelectedShopName();
    this.updProduct.productId = parseInt(this.loginService.getSelectedProductId());
    this.selectedProductName = this.loginService.getSelectedProductName();
    this.updProduct.productName =this.selectedProductName;
    this.selectedShopName = this.loginService.getSelectedShopName();
    this._product.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        // console.log(error);
        Swal.fire('Error !', 'Error on loading data', 'error');
      }
    )

  }

  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selectedFile = <File>e.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  onUpload(pId) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post(`${baseUrl}/product/insertImage/${pId}`, fd).subscribe(res => {
      // console.log(res);
    });
  }

  formSubmit() {
    if (this.updProduct.brandName.trim() == '' || this.updProduct.brandName == null) {
      this._snack.open("Product Name Required !!", 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.change = true;
    this._product.updateProduct(this.updProduct).subscribe(
      (data: any) => {
        this.onUpload(this.updProduct.productId);
        localStorage.setItem('userDetail', JSON.stringify(data));
        setTimeout(()=>{this.change = false; Swal.fire("Success !!", 'Product Updated Sucessfully', 'success');},2000);

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
