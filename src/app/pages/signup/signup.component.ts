import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/signUpService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }
  public user = {
    userName: '',
    userPassword: '',
    userEmail: '',
    location: ''
  };

  ngOnInit(): void { }

  formSubmit() {
    if (this.user.userName == '' || this.user.userName == null) {
      alert('User is required !!');
      return;
    }

    this.userService.addUser(this.user).subscribe((data) => {
      Swal.fire('Success', 'user is registered', 'success');
    },
      (error) => {
        this.snack.open('User is already Registered !!', '', {
          duration: 3000,
        });
      }
    )
  }

  handleClear() {
    this.user = {
      userName: '',
      userPassword: '',
      userEmail: '',
      location: ''
    }
  }
}


