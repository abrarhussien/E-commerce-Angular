import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }
  getorderByStatus(status:string){
    return this.httpClient.get("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/status/"+status);

  }

  getOrders(){
    return this.httpClient.get("https://node-e-commerce-rlkh.onrender.com/api/v1/orders");

  }
  setOrderStatus(id:string,newStatus:any){
    return this.httpClient.put("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/"+id+"/status",newStatus);

  }

}
