import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
   orders: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
     this.getOrders();

  }

  cancelOrder(orderId:string):void {
    const url = `https://node-e-commerce-rlkh.onrender.com/api/v1/orders/${orderId}/status`;
    const body = {status:"Canceled"}

        this.http
      .put(url, body )
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
          this.orders = response.data;
          this.getOrders()
        }
      );
  }

  getOrderId(orderId: string) {
    this.router.navigate(['/profile/orders/'+ orderId]);
  }

  getOrders(): void {
    const url = 'https://node-e-commerce-rlkh.onrender.com/api/v1/orders/user';

    this.http
      .get("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/user")
      .pipe(
        catchError((error) => {
          console.log(error);

          return error;
        })
      ).subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.orders = response.data;
        }
      });
  }

}
