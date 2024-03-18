import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardOrdersComponent,
    DashboardProductsComponent,
    DashboardEditProductComponent,
    DashboardAddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
