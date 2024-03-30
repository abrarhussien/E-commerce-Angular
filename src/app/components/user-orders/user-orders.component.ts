import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
   orders: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getOrders();
  }

  cancelOrder(orderId:string):void {
    const url = `https://node-e-commerce-rlkh.onrender.com/api/v1/orders/${orderId}/status`;
    const body = {status:"Canceled"}
        let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
        });
        this.http
      .put(url, body ,  { headers })
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
    const url = 'https://node-e-commerce-rlkh.onrender.com/api/v1/orders';
    let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
    });
    this.http
      .get(url, { headers })
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        if (response) {
          //console.log(response);
          this.orders = response.data;
        }
      });
  }

}
