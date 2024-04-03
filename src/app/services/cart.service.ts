import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: IProduct[] = [];
  cartItemCount: number = 0;
  cartCounterSubject: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  // public cartCounter$: Observable<number> = this.cartCounterSubject.asObservable();
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  private apiUrl = 'https://node-e-commerce-rlkh.onrender.com/api/carts';
  private baseUrl = 'http://localhost:3040/api/carts/payement';

  constructor(private http: HttpClient) {  }

  addToCart(id: string, quantity: number): Observable<any> {
    const body = {
      productId: id,
        quantity: quantity
    }
    this.getCount()
    this.incrementCartCounter()
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  updateCart(cartId: string, quantity: number): Observable<any> {
    console.log(quantity);

    const url = `https://node-e-commerce-rlkh.onrender.com/api/carts/update/${cartId}`
    const body = {
      quantity: quantity
    }
    return this.http.patch<any>(`${url}`, body);
  }

  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getCount() {
    this.getCartItems().subscribe((res)=>{this.cartCounterSubject.next(res.items.length);
    })
  }

  // updateCartItem(productId: string, quantity: number): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/update/${productId}`, { quantity });
  // }

  removeCartItem(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove/${productId}`);
  }

  incrementCartCounter(): void {
    let currentCount = this.cartCounterSubject.value;
    this.cartCounterSubject.next(currentCount + 1);
  }

  // getCashPaymentInfo(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}`);
  // }

  makePayment(cartId:string,order:any): Observable<any> {
    return this.http.post<any>("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/checkout-session/"+cartId,order);
  }
  placeOrder(cartId: any,order:any) {
    return this.http.post<any>("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/"+cartId,order);
  }

  getOrder(id: string) {
    return this.http.get<any>("https://node-e-commerce-rlkh.onrender.com/api/v1/orders/"+id);


}

}
