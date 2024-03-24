import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  test() {
    this.http
      .get('https://node-e-commerce-rlkh.onrender.com/api/v1/orders')
      .subscribe((data: any) => console.log(data));
  }
}
