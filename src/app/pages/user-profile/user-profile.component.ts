import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = null;
  userCompleteDetails = null;
  public userDetails = null;
  data = {
    "interest": "",
    "userId": null
  }

  userInterestToDelete = {
    "userId": null,
    "userInterestId": null
  }


  categories = [];
  userInterest = null;
  check: boolean = false;
  add: boolean = true;

  constructor(private loginService: LoginService, private userService: UserProfileService, private snack: MatSnackBar, private _product: ControlProductsService) { }

  ngOnInit(): void {

    this.user = this.loginService.gotUser();
    this.userCompleteDetails = this.loginService.getUserCompleteDetail();
    this.userInterest = this.userCompleteDetails.userInterestEntities;

    const storage = localStorage.getItem('google_auth');
    if (storage) {
      this.userDetails = JSON.parse(storage);
    }
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
  addInterest() {
    this.check = true;
    this.add = false;
  }
  addValue() {

    this.data.userId = this.userCompleteDetails.userId;
    this.userService.addUserInterest(this.data).subscribe(
      (data) => {
        //Success
        // console.log(data);
        localStorage.setItem('userDetail', JSON.stringify(data));

        this.check = false;
        this.add = true;
        Swal.fire('Success', 'User Interest is added', 'success');
        this.ngOnInit()
      },
      (error) => {
        //error
        // console.log(error);
        this.snack.open('Already exist !!', 'Ok', {

          duration: 3000,
        });
        this.ngOnInit()
        this.check = false;
        this.add = true;
      }
    )
  }

  onDeleteInterest(interest) {
    this.userInterestToDelete.userInterestId = interest.userInterestId;
    this.userInterestToDelete.userId = this.userCompleteDetails.userId;
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',

    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserInterest(this.userInterestToDelete).subscribe(
          (data: any) => {
            localStorage.setItem('userDetail', JSON.stringify(data));
            this.ngOnInit()
          },
          (error) => {
            // console.log(error);
            Swal.fire('Error !!', 'Server Error !!', 'error');
          }

        );
        Swal.fire(
          'Deleted!',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Delete request cancelled :)',
          'error'
        )
      }
    })
  }
}
