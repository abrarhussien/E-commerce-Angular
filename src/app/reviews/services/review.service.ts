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
  constructor(private httpclient: HttpClient) {}

  getProductReviews(id: string) {
    return this.httpclient
      .get<Review[]>(`${this.api}/api/product/${id}/reviews`)
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
  updateoductReviews(data: any,id:string) {
    return this.httpclient
      .patch(`${this.api}/api/product/${id}/reviews`, data)
      .pipe(
        catchError((error: any) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }

  deleteProductReviews(id: string, userId: string) {

    //const headers = new HttpHeaders();
    let headers = new HttpHeaders();
     headers = headers.set('user', userId);
    const requestOptions: Object = {
      /* other options here */
      headers:headers,
      responseType: 'text'
    }
    return this.httpclient
      .delete(`${this.api}/api/product/${id}/reviews`,requestOptions)
      .pipe(
        // catchError((error: any) => {
        //   console.error('API Error:', error);
        //   throw error;
        //   // return throwError('An error occurred while deleting the reviews.');
        // })
        catchError((error: any) => {
          console.error('API Error:', error);
          const errorMessage = 'An error occurred while deleting the reviews.';
          return throwError(errorMessage);
        })
      );
  }

  // delete(id:string){
  //   return this.httpclient.delete<User>(`http://localhost:3000/users/${id}`)
  // }
}
