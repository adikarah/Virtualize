import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { StoresService } from 'src/app/services/adminService/stores.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-stores',
  templateUrl: './add-stores.component.html',
  styleUrls: ['./add-stores.component.scss']
})
export class AddStoresComponent implements OnInit {
  change: boolean = false;
  admin = null;
  temp: any;
  url = "https://www.materialui.co/materialIcons/action/store_black_192x192.png"
  selectedFile = null;

  store = {
    "adminId": 0,
    "gst": '',
    "shopDescription": '',
    "shopLocation": '',
    "shopName": ''
  };

  constructor(private _store: StoresService, private _snack: MatSnackBar, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.store.adminId = this.loginService.getUserCompleteDetail().adminId;
    this.admin = this.loginService.getUserCompleteDetail();
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

  onUpload(sId) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post(`${baseUrl}/admin/shop/insertImage/${sId}`, fd).subscribe(res => {
      // console.log(res);
    });

  }

  formSubmit() {
    if (this.store.shopName.trim() == '' || this.store.shopName == null) {
      this._snack.open("Shop Name Required !!", 'Ok', {
        duration: 3000,
      });
      return;
    }
    this.change = true;
    this._store.addStore(this.store).subscribe(
      (data: any) => {
        let foundShopId: any;
        this.temp = [];
        for (var j = 0; j < this.admin.adminShops.length; j++) {
          this.temp.push(this.admin.adminShops[j].shopId)
        }

        for (var i = 0; i < data.adminShops.length; i++) {
          if (this.temp.includes(data.adminShops[i].shopId)) {
          }
          else {
            foundShopId = data.adminShops[i].shopId
          }

        }

        this.onUpload(foundShopId);
        localStorage.setItem('userDetail', JSON.stringify(data));
        this.change = false;
        Swal.fire("Success !!", 'Store Added Sucessfully', 'success');
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error !!', 'error');
        this.change = false;
      }
    );
  }

  cleared() {
    window.location.reload();
  }
}
