import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './models/authinterceptor';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/registerr/registerr.component';
import { provideRouter } from '@angular/router';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { UserOrdersComponent } from './component/user-orders/user-orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

@NgModule({
  declarations: [AppComponent,
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
         DashboardAddProductComponent],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
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
