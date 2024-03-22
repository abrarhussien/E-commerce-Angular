import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = environment.apiUrl;
  constructor(private httpclient: HttpClient) {}

  getAllProducts(page: number,sortField:string,sortOrder:string) {
    return this.httpclient
      .get<Product[]>(`${this.api}/api/products?page=${page}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  getProductsById(id: string) {
    return this.httpclient.get<Product>(`${this.api}/api/products/${id}`).pipe(
      catchError((error: any) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
}
