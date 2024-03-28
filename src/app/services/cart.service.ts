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
  private cartCounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartCounter$: Observable<number> = this.cartCounterSubject.asObservable();
  private apiUrl = 'https://node-e-commerce-rlkh.onrender.com/api/carts';

  constructor(private http: HttpClient) { }

  addToCart(id: string, quantity: number): Observable<any> {
    const body = {
      productId: id,
        quantity: quantity
    }
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  getCartItems(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}`);
  }

  // updateCartItem(productId: string, quantity: number): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/update/${productId}`, { quantity });
  // }

  removeCartItem(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove/${productId}`);
  }

  // addToCart(product: IProduct) {
  //   this.cartItems.push(product);
  //   console.log(this.cartItems);
  //   this.cartItemCount = this.cartItems.length;
  // }

  //   getCartItems(): IProduct[] {
  //   return this.cartItems;
  // }

  incrementCartCounter(): void {
    let currentCount = this.cartCounterSubject.value;
    this.cartCounterSubject.next(currentCount + 1);
  }

}

