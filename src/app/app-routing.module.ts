import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { ContainerComponent } from './container/container.component';
import { AddDiscountComponent } from './pages/admin/add-discount/add-discount.component';
import { AddProductsComponent } from './pages/admin/add-products/add-products.component';
import { AddRecommendationComponent } from './pages/admin/add-recommendation/add-recommendation.component';
import { AddStoresComponent } from './pages/admin/add-stores/add-stores.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { DiscountsComponent } from './pages/admin/discounts/discounts.component';
import { ShopProductsComponent } from './pages/admin/shop-products/shop-products.component';
import { StoresComponent } from './pages/admin/stores/stores.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { UpdateStoreComponent } from './pages/admin/update-store/update-store.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminGuard } from './services/adminService/admin.guard';
import { NormalGuard } from './services/signUpService/normal.guard';
import {NotificationPageComponent} from './notification-page/notification-page.component'
import { UserProfileGuard } from './services/userService/userProfileGuard/user-profile.guard';
import { UserNotificationGuard } from './services/userService/userNotificationGuard/user-notification.guard';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
    path:'product-page',
    component:ProductPageComponent,
    pathMatch:'full',
  },
  {
    path:'user-container/:type',
    component:ContainerComponent,
    pathMatch:'full',

  },
  {
    path:'user-profile',
    component:UserProfileComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      }
    ],
    canActivate:[UserProfileGuard]

  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    children:[
      {
        path:'',
        component:WelcomeAdminComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'stores',
        component:StoresComponent
      },
      {
        path:'add-store',
        component:AddStoresComponent
      },
      {
        path:'update-store',
        component:UpdateStoreComponent

      },
      {
        path:'update-product',
        component:UpdateProductComponent

      },
      {
        path:'add-product',
        component:AddProductsComponent
      },
      {
        path:'add-recommendation',
        component:AddRecommendationComponent

      },
      {
        path:'shop-products',
        component:ShopProductsComponent

      },
      {
        path:'discounts',
        component:DiscountsComponent
      },
      {
        path:'add-discount',
        component:AddDiscountComponent
      }
    ],
    canActivate:[AdminGuard],
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
  },
  {
    path:'notification-page',
    component:NotificationPageComponent,
    pathMatch:'full',
    canActivate:[UserNotificationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
