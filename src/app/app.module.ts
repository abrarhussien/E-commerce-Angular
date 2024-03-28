import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ProductModule } from './products/product.module';
import { ReviewModule } from './reviews/review.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';

import { AuthInterceptor } from './models/authinterceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/registerr/registerr.component';
import { provideRouter } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ProfileComponent,
    HomeComponent,
    UserOrdersComponent,
    OrderDetailsComponent,
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardOrdersComponent,
    DashboardProductsComponent,
    DashboardEditProductComponent,
    DashboardAddProductComponent,
    AppComponent,
    ProductComponent,
    CartComponent,
    LoginComponent,
    AboutUsComponent,
    CategoriesComponent,
    FooterComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ProductModule,ReviewModule,

  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],


  bootstrap: [AppComponent],
})
export class AppModule {}
