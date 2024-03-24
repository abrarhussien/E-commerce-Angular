import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/registerr/registerr.component';
import { AuthInterceptor } from './models/authinterceptor';
import { provideRouter } from '@angular/router';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { UserOrdersComponent } from './component/user-orders/user-orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, NavBarComponent, ProfileComponent, HomeComponent, UserOrdersComponent, OrderDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
