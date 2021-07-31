import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/signUpService/user.service';
import { LoginData } from 'src/app/interfaces/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  change:boolean=false;
  constructor(private snack: MatSnackBar, private loginService:LoginService,private router:Router,private authService:SocialAuthService,private userService:UserService ) { }

  public login: LoginData = {
    id: "",
    password: "",
    type: "",
    latitude: 0,
    longitude: 0
}

  public signupWithGoogle = {
    userName: '',
    userPassword: '',
    userEmail: '',
    location: ''
  }

  public checkValidLogin = {
    id: '',
    password: '',
    type: '',
    latitude: 0,
    longitude: 0
  };


  public checkUserId ={
    id:''
  }

  categories = ["USER", "ADMIN"];
  data = null;
  selectAdmin = false;


  ngOnInit(): void {
  }

  check: boolean = false;
  func() {
    this.check = true;
  }

  checkAdmin() {
    if (this.login.type == "ADMIN") {
      this.selectAdmin = true;
    }
  }

  loginUser() {
    this.login.type = "USER";
  }
  loginAdmin() {
    this.login.type = "ADMIN";
  }



  public userDetails;
  signInHandler(): void {

    //For google Authentication
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {

      //Get Data For google login service
      localStorage.setItem('google_auth', JSON.stringify(data));
      const storage = localStorage.getItem('google_auth');

      if (storage) {
        this.userDetails = JSON.parse(storage);
        this.signupWithGoogle.userName = this.userDetails.name;
        this.signupWithGoogle.userPassword = "123";
        this.signupWithGoogle.userEmail = this.userDetails.email;
        this.signupWithGoogle.location = this.userDetails.provider;
        this.checkValidLogin.id = this.userDetails.email;
        this.checkUserId.id=this.userDetails.email;
        this.checkValidLogin.password = "123";
      }

      console.log(this.checkUserId)

      navigator.geolocation.getCurrentPosition( (position) => {
        console.log('lat: ' + position.coords.latitude + ' lon: ' + position.coords.longitude);
        this.change =true;
        this.loginService.checkUserExist(this.checkUserId).subscribe((data)=>{
          this.checkValidLogin.type=data[0]
          console.log(data,"take your data");
          console.log(this.checkValidLogin,"1")
          this.loginService.checkValidUser(this.checkValidLogin).subscribe((data) => {
            console.log(data,"another function");
          console.log(this.checkValidLogin,"2");

          this.checkValidLogin.latitude=position.coords.latitude;
          this.checkValidLogin.longitude=position.coords.longitude;
          this.loginService.getUser(this.checkValidLogin).subscribe((data) => {
            //Success

            if (this.loginService.generateToken(this.checkValidLogin) == "shashank-token") {
              //Login..
              this.loginService.loginUser(this.loginService.generateToken(this.checkValidLogin))
              this.loginService.setUser(this.checkValidLogin);
              this.loginService.setUserCompleteDetail(data);
              this.loginService.setSelectedShop(null);
              this.loginService.setSelectedShopId(null);
              this.loginService.setSelectedShopName(null);
              this.loginService.setSelectedProduct(null);
            }

            if (this.loginService.getUserRole() == "USER") {
              // window.location.href = "/"
              // this.router.navigate(['/']);
              setTimeout(()=>{this.change=false; window.location.href="/";},3000);
              this.loginService.loginStatusSubject.next(true);
            }
            else if (this.loginService.getUserRole() == "ADMIN") {
              setTimeout(()=>{this.change=false; window.location.href="/admin";},3000);
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();
            }
          },
          (error) => {
            //error
              console.log(error);
              //alert("something went wrong");
              this.snack.open('User Not Registered !!', 'OK', {
                duration: 3000,
              });
            }
            )
          }
          )
        },
        (error)=>{
          this.userService.addUser(this.signupWithGoogle).subscribe((data) => {
            this.checkValidLogin.type="USER";
            this.checkValidLogin.latitude=position.coords.latitude;
            this.checkValidLogin.longitude=position.coords.longitude;
            this.loginService.getUser(this.checkValidLogin).subscribe((data) => {
              //Success
              if (this.loginService.generateToken(this.checkValidLogin) == "shashank-token") {
                //Login..
                this.loginService.loginUser(this.loginService.generateToken(this.checkValidLogin))
                this.loginService.setUser(this.checkValidLogin);
                this.loginService.setUserCompleteDetail(data);
                this.loginService.setSelectedShop(null);
                this.loginService.setSelectedProduct(null);
              }

              if (this.loginService.getUserRole() == "USER") {

                setTimeout(()=>{this.change=false; window.location.href="/";},1000);

                this.loginService.loginStatusSubject.next(true);
              }
              else if (this.loginService.getUserRole() == "ADMIN") {

                setTimeout(()=>{this.change=false; window.location.href="/admin";},1000);
                this.loginService.loginStatusSubject.next(true);
              } else {
                this.loginService.logout();
              }
            },
            (error) => {
              //error
              console.log(error);
              //alert("something went wrong");
              this.snack.open('User Not Registered !!', 'OK', {
                duration: 3000,
              });
            }
            )
          }
          )
        })
      });
    });
  }

  /**
   * This function will help you to login the user or admin.
   * @returns
   */
  formSubmit() {
    if (this.login.id.trim() == '' || this.login.id == null) {
      alert('User is required !!');
      return;
    }
    if (this.login.password.trim() == '' || this.login.password == null) {
      alert('Password is required !!');
      return;
    }

    this.change =true;

    if(! navigator.geolocation) {
      console.log("location is not support by browser");
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      console.log('lat: ' + position.coords.latitude + ' lon: ' + position.coords.longitude);

      this.login.latitude=position.coords.latitude;
      this.login.longitude=position.coords.longitude;
      this.loginService.getUser(this.login).subscribe( (data)=>{

        console.log(this.change,"shashank")

        if(this.loginService.generateToken(this.login)=="shashank-token"){
          //Login..
          this.loginService.loginUser(this.loginService.generateToken(this.login));
          this.login.password = null;
          this.loginService.setUser(this.login);
          this.loginService.setUserCompleteDetail(data);
        }

        if (this.loginService.getUserRole() == "USER") {
          setTimeout(()=>{this.change=false; window.location.href="/";},2000);

          console.log(data);
          this.loginService.loginStatusSubject.next(true);
        }
        else if(this.loginService.getUserRole()=="ADMIN"){
          setTimeout(()=>{this.change=false; window.location.href="/admin";},1000);
         this.loginService.loginStatusSubject.next(true);
        }else{
          this.loginService.logout();
        }
      },
      (error)=>{
        console.log(error);
        setTimeout(()=>{this.change=false; console.log(this.change)},2000);
        this.snack.open('User Not Registered !!','OK',{
          duration:3000,
        });
      }
    )
    });

   }
}
