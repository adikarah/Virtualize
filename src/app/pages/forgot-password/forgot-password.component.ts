import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from 'src/app/services/ForgetPasswordService/forgot-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/LoginService/login.service';


@Component({
  selector: 'app-forgot-password',
  template: `<re-captcha
    (resolved)="resolved($event)"
    siteKey="6Lc3Bw0bAAAAADleEiHiHKrqqLIWLRJ4Ye01FK6q"
  ></re-captcha>`,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  data = {
    to: "",
    subject: "Reset Your Password",
    message: this.generateOTP()

  }

  updPassword = {
    "id": "",
    "password": "",
    "type": "USER"
  }

  checkEmail = {
    id: "",
    password: '123',
    type: 'USER'
  }

  flag: boolean = false;
  validate = '';

  constructor(private emailService: ForgotPasswordService, private snack: MatSnackBar, private _renderer: Renderer2, private loginService: LoginService) { }

  ngOnInit(): void {

    let script = this._renderer.createElement("script");
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._renderer.appendChild(document.body, script);

  }

  check: boolean = false;
  updVar: boolean = true;
  checkValid: boolean = true;

  myfunction() {
  }

  isValid() {
    if (this.data.message === this.validate) {
      Swal.fire({
        icon: 'success',
        title: 'Verified',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => { this.checkValid = true; this.updVar = false; }, 3000);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect OTP try again',
      })
    }

  }

  generateOTP() {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    // Find the length of string
    var len = string.length;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  //check whether captcha is verified or not
  onTouch() {
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
      document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
      return false;
    }
    return true;
  }

  verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
  };

  onUpdate() {

    if (this.updPassword.id.trim() == '' || this.updPassword.id == null) {
      alert('Email is required !!');
      return;
    }

    if (this.updPassword.password.trim() == '' || this.updPassword.password == null) {
      alert('Password is required !!');
      return;
    }

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.emailService.updatePassword(this.updPassword).subscribe((data) => {
        },
          (error) => {
            // console.log(error);
            this.snack.open("Error", "OK", {
              duration: 2000
            });
          }
        )
        Swal.fire('Saved!', '', 'success')
        setTimeout(() => { window.location.reload(); }, 4000);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }
  doSubmitForm() {
    if (this.data.to == '' || this.data.subject == '' || this.data.message == '' || grecaptcha.getResponse().length == 0) {
      this.snack.open('Fields can not be empty !!', "OK");
      return;
    }
    if (this.checkEmail.id.trim() == '' || this.checkEmail.id == null) {
      alert('Email is required !!');
      return;
    }

    this.loginService.checkValidUser(this.checkEmail).subscribe(
      (data) => {
        this.flag = true;
        this.emailService.sendEmail(this.data).subscribe(
          response => {
            this.flag = false;
            // this.snack.open("Send Success","OK");

            Swal.fire({
              title: 'Hi ',
              text: 'OTP sent on your mail !',
              imageUrl: 'https://cdn.boldomatic.com/content/post/dyQbFQ/check-your-mail?size=800',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
          },
          error => {
            // console.log(error);
            this.flag = false;
            this.snack.open("Error", "OK");
          }

        )
        setTimeout(() => { this.check = true; this.checkValid = false; }, 4000);
      },
      (error) => {
        // console.log(error);
        this.snack.open('User Not Registered !!', 'OK', {
          duration: 3000,
        });
      }
    )
  }
}
