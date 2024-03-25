import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient:HttpClient){}

    getCategories(){
      return this.httpClient.get("https://node-e-commerce-rlkh.onrender.com/api/v1/category")
    }




}
