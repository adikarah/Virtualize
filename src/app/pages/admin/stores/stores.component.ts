import { Component, OnInit } from '@angular/core';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { StoresService } from 'src/app/services/adminService/stores.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../services/notificationService/notification.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  userStores=null;
  change:boolean=false;
  shopImageUrl = environment.storeImageUrl;
  selectedShop=null;
  delShop={
    "adminId": 0,
    "shopId": 0
  }

  constructor(private _stores:StoresService, private loginService:LoginService,
    private _controlProduct:ControlProductsService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.change =true;
    this.userStores=this.loginService.getUserCompleteDetail().adminShops;
    this.delShop.adminId=this.loginService.getUserCompleteDetail().adminId;
    // console.log(this.userStores);
    setTimeout(()=>{this.change=false;},550);
  }

  onUpdateStore(val){
      localStorage.setItem('selectedShopId', val.shopId)
      localStorage.setItem('selectedShopName',val.shopName)
  }

  onDelStore(val){
    this.delShop.shopId=val.shopId;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover your store!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No',

    }).then((result) => {
      if (result.isConfirmed) {
        this._stores.deleteStore(this.delShop).subscribe(
          (data:any) =>{
            localStorage.setItem('userDetail',JSON.stringify(data));
            // setTimeout(() => { window.location.reload(); }, 2000);
            setTimeout(() => { this.ngOnInit() }, 2000);
          },
          (error)=>{
            // console.log(error);
            Swal.fire('Error !!','Server Error !!','error');
          }

        );
        Swal.fire(
          'Deleted!',
          'Your store has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your store is safe :)',
          'error'
        )
      }
    })
  }

  addProduct(store){
    // check web socket
    this.notificationService._send(4);
    localStorage.setItem('selectedShopId', store.shopId)
    localStorage.setItem('selectedShopName',store.shopName)
  }
}
