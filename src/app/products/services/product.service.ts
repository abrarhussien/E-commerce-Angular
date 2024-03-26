import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  api = environment.apiUrl

  constructor(private httpclient: HttpClient) {}

  getAllProducts(page: number, sortField:string) {
    return this.httpclient
      .get(
        `${this.api}/api/v1/products?page=${page}&sort=${sortField}&limit=6`
      )
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  getProductsById(id: string) {
    return this.httpclient.get<Product>(`${this.api}/api/v1/products/${id}`).pipe(
      catchError((error: any) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
}
