import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.css'
})
export class DashboardOrdersComponent  {
  constructor(private ordersService :OrdersService , private activatedRoute: ActivatedRoute){
  }

  route= this.activatedRoute.snapshot.url[1]?.path




  orders=this.route==="accepted"?this.ordersService.getAcceptedOrders(): this.route==="rejected"?this.ordersService.getRejectedOrders():this.route==="pending"? this.ordersService.getPendingOrders():this.ordersService.getOrders();

  changeStatus(newStatus:Event,id:string){
    //@ts-ignore
    this.ordersService.setOrderStatus(id,newStatus.target.value);
  }


}
