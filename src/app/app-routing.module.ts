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
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {path:'about-us', component:AboutUsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent ,
  canActivate:[AuthGuard]
 },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,


    children: [
      { path: 'orders/pending', component: DashboardOrdersComponent, canActivate:[AdminGuard] },
      { path: 'orders/accepted', component: DashboardOrdersComponent, canActivate:[AdminGuard]  },
      { path: 'orders/rejected', component: DashboardOrdersComponent, canActivate:[AdminGuard]  },
      { path: 'orders', component: DashboardOrdersComponent , canActivate:[AdminGuard] },
      { path: 'products/add', component: DashboardAddProductComponent , canActivate:[AdminGuard] },
      { path: 'products/edit/:id', component: DashboardEditProductComponent, canActivate:[AdminGuard]  },
      { path: 'products', component: DashboardProductsComponent , canActivate:[AdminGuard] },
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
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'profile/orders',
    component: UserOrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'profile/orders/:id',
    component: OrderDetailsComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
