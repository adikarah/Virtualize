import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContainerComponent } from './container/container.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {ParticularProductDetailService} from './services/productService/particular-product-detail.service';
import { UserdashboardCategoryComponent } from './userdashboard-category/userdashboard-category.component';
import { ProductDataService } from './services/productService/product-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { AddStoresComponent } from './pages/admin/add-stores/add-stores.component';
import { ShopProductsComponent } from './pages/admin/shop-products/shop-products.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SlideRecommedationComponent } from './slide-recommedation/slide-recommedation.component';
import { RecommedationService } from './services/recommedationService/recommedation.service';
import { StaticRecommedationComponent } from './static-recommedation/static-recommedation.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxSpinnerModule } from "ngx-spinner";
import { FilterPipe } from './Pipes/filter.pipe';
import { UpdateStoreComponent } from './pages/admin/update-store/update-store.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import { DiscountsComponent } from './pages/admin/discounts/discounts.component';
import { AddDiscountComponent } from './pages/admin/add-discount/add-discount.component';
import { RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import { AddRecommendationComponent } from './pages/admin/add-recommendation/add-recommendation.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotificationService } from './services/notificationService/notification.service';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    WelcomeAdminComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ContainerComponent,
    ProductPageComponent,
    UserdashboardCategoryComponent,
    StoresComponent,
    AddStoresComponent,
    ShopProductsComponent,
    AddProductsComponent,
    SlideRecommedationComponent,
    StaticRecommedationComponent,
    HomePageComponent,
    FilterPipe,
    UpdateStoreComponent,
    UpdateProductComponent,
    DiscountsComponent,
    AddDiscountComponent,
    AddRecommendationComponent,
    UserProfileComponent,
    NotificationBarComponent,
    NotificationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    MatGridListModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule,
    SocialLoginModule,
    MatSelectModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatProgressBarModule
  ],
  providers: [ProductDataService, ParticularProductDetailService,RecommedationService,NotificationService,NgxSpinnerModule,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '760874263293-n1nq43t6u3kibn9lh2pa62140rsdumdn.apps.googleusercontent.com'
            )
          }

        ]
      } as SocialAuthServiceConfig,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
