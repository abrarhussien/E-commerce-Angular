import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/registerr/registerr.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { UserOrdersComponent } from './component/user-orders/user-orders.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

export const routes: Routes = [
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
