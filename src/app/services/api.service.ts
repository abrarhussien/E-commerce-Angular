import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  getProducts() {
    return this.httpClient.get<IProduct[]>('http://localhost:3000/products');
  }
  getProductById(id: string) {
    return this.httpClient.get<IProduct>('http://localhost:3000/products/' + id);
  }
  addProduct(product :IProduct){
    return this.httpClient.post('http://localhost:3000/products',product);
  }
  editProduct(newProduct :IProduct){
    return this.httpClient.put('http://localhost:3000/products/'+newProduct.id,newProduct);
  }
  deleteProduct(id:string){
    return this.httpClient.delete('http://localhost:3000/products/'+id);
  }
}
