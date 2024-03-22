import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient: HttpClient ) {}

  getAll(){
    return this.httpclient.get<Category[]>('http://localhost:3000/categories')
  }
}
