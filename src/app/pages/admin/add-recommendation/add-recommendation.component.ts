import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/adminService/control-products.service';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/LoginService/login.service';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../services/notificationService/notification.service';

@Component({
  selector: 'app-add-recommendation',
  templateUrl: './add-recommendation.component.html',
  styleUrls: ['./add-recommendation.component.scss']
})
export class AddRecommendationComponent implements OnInit {
  change: boolean = false;

  categories = [];
  url = "https://thumbs.dreamstime.com/b/recommendation-icon-vector-isolated-white-background-sign-transparent-134063044.jpg"
  selectedFile = null;

  temp = null;
  submitted = false;
  recommend = {
    "categoryType": "",
    "description": "",
    "endDate": null
  }

  constructor(private _product: ControlProductsService, private _snack: MatSnackBar,
    private loginService: LoginService, private http: HttpClient,
    private notificationSerive: NotificationService) { }

  ngOnInit(): void {
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

  onUpload(rId) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${baseUrl}/recommend/insertImage/${rId}`, fd).subscribe(res => {
    });
  }

  dateFormating(yyyy, mm, dd) {
    yyyy = yyyy.toString()
    mm = mm.toString()
    dd = dd.toString()
    return yyyy + "-" + mm + "-" + dd
  }

  formSubmit() {
    this.change = true;
    this.recommend.endDate = this.dateFormating(this.temp.year, this.temp.month, this.temp.day)
    this._product.addRecommendation(this.recommend).subscribe((data: any) => {
      this.onUpload(data.recommendId);
      this.notificationSerive._send(data.recommendId);
      setTimeout(()=>{this.change = false; Swal.fire("Success !!", 'Recommendation Added Sucessfully', 'success');},2000);
    },
      (error) => {
        setTimeout(()=>{this.change = false; Swal.fire('Error !!', 'Server Error !!', 'error');},2000);

      }
    );
  }

  cleared() {
    window.location.reload();
  }
}

