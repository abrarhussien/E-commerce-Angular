import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { RegisterComponent } from './components/registerr/registerr.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'orders/pending', component: DashboardOrdersComponent },
      { path: 'orders/accepted', component: DashboardOrdersComponent },
      { path: 'orders/rejected', component: DashboardOrdersComponent },
      { path: 'orders', component: DashboardOrdersComponent },
      { path: 'products/add', component: DashboardAddProductComponent },
      { path: 'products/edit/:id', component: DashboardEditProductComponent },
      { path: 'products', component: DashboardProductsComponent },
      { path: '', redirectTo: '/dashboard/orders', pathMatch: 'full' },
    ],
  },
  {
    path: 'registerr',
    component: RegisterComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile/orders',
    component: UserOrdersComponent,
  },
  {
    path: 'profile/orders/:id',
    component: OrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


