import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  api = environment.apiUrl;
  // api = 'https://node-ecommerce-sr19.onrender.com';
  constructor(private httpclient: HttpClient) {}
  getCurrentUser() {
    return this.httpclient.get(`${this.api}/api/profile`).pipe(
      catchError((error: any) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
  getProductReviews(page:number,id: string) {
    return this.httpclient
      .get<Review[]>(`${this.api}/api/product/${id}/reviews?page=${page}&limit=3`)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  addroductReviews(id: string, data: any) {
    return this.httpclient
      .post(`${this.api}/api/product/${id}/reviews`, data)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
  updateoductReviews(data: any, id: string) {
    return this.httpclient
      .patch(`${this.api}/api/product/${id}/reviews`, data)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  deleteProductReviews(id: any) {
    //const headers = new HttpHeaders();
    // let headers = new HttpHeaders();
    //  headers = headers.set('user', userId);
    // const requestOptions: Object = {
    //   /* other options here */
    //   headers:headers,
    //   responseType: 'text'
    // }
    return this.httpclient.delete(`${this.api}/api/product/${id}/reviews`).pipe(
      // catchError((error: any) => {
      //   console.error('API Error:', error);
      //   throw error;
      //   // return throwError('An error occurred while deleting the reviews.');
      // })

      catchError((error: any) => {
        //console.log('id id id', id);
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  // delete(id:string){
  //   return this.httpclient.delete<User>(`http://localhost:3000/users/${id}`)
  // }
}
