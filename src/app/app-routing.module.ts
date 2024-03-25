import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './components/dashboard-products/dashboard-products.component';
import { DashboardAddProductComponent } from './components/dashboard-add-product/dashboard-add-product.component';
import { DashboardEditProductComponent } from './components/dashboard-edit-product/dashboard-edit-product.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/registerr/registerr.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { UserOrdersComponent } from './component/user-orders/user-orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';



export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
  children:[
    { path: 'orders/pending', component:DashboardOrdersComponent },
    { path: 'orders/accepted', component:DashboardOrdersComponent },
    { path: 'orders/rejected', component:DashboardOrdersComponent },
    { path: 'orders', component:DashboardOrdersComponent },
    { path: 'products/add', component:DashboardAddProductComponent  },
    { path: 'products/edit/:id', component:DashboardEditProductComponent  },
    { path: 'products', component:DashboardProductsComponent  },
    { path: '',   redirectTo: '/dashboard/orders', pathMatch: 'full' },
    ] },
  {
    path: 'registerr',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component:ProfileComponent
  },
    {
    path: 'home',
    component:HomeComponent
  },
        {
    path: 'profile/orders',
    component:UserOrdersComponent
  },
                {
    path: 'profile/orders/:id',
    component:OrderDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
