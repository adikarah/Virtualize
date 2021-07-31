import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { ParticularProductDetailService } from 'src/app/services/productService/particular-product-detail.service';
import { ProductDataService } from 'src/app/services/productService/product-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  typeOfUser = 0;
  user = null;
  searchCategory = JSON.parse(this.particularProductDetailService.getCategory());
  dropdownContent = 0;
  searchText = JSON.parse(this.particularProductDetailService.getSearch());
  allCategoryOfProduct: any;
  constructor(public loginService: LoginService, private particularProductDetailService: ParticularProductDetailService,
    private productDataService: ProductDataService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.gotUser();

    try {
      this.typeOfUsers()
    }
    catch (e) {
      this.typeOfUser = 0;
    }

    this.loginService.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.gotUser();
    });

    this.productDataService.getCategoryList().subscribe((data) => {
      this.allCategoryOfProduct = data;
    });
    this.reloadCurrentRoute()
  }

  /**
   * reloading the search category each time url change
   */
  reloadCurrentRoute() {
    this.router.events.pipe(filter(data1 =>
      data1 instanceof ActivationEnd)).subscribe(() => {
        this.searchCategory = JSON.parse(this.particularProductDetailService.getCategory());
        this.searchText = JSON.parse(this.particularProductDetailService.getSearch());
      })
  }

  /**
   * This funciton will logout the user session
   */
  public logout() {
    this.loginService.logout();
    window.location.reload();
  }

  /**
   * search bar values
   */
  searchBar(event: Event) {
    this.searchText = (<HTMLInputElement>event.target).value;
  }

  /**
   * select from the Category List in search bar
   * @param data send the selected item name
   */
  onClickSelectCategoryList(data: any) {
    this.searchCategory = data;
  }

  /**
   * storing and change the local storage of search and category selected by user
   */
  onClickSearchList() {
    this.particularProductDetailService.setCategory(this.searchCategory);
    this.particularProductDetailService.setSearch(this.searchText);
    if (this.searchCategory == "CATEGORY") {
      Swal.fire('Info !', 'Please select a category', 'info');
    }
  }

  /**
   * making visible to user and non-user (not admin)
   * 0 = visible
   * 1 = invisible
   */
  typeOfUsers() {
    if (this.loginService.getUserRole() == 'ADMIN') {
      this.typeOfUser = 1;
    }
  }
}
