import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

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
}
