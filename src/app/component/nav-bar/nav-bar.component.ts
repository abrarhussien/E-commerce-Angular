import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router:Router,private http:HttpClient) {

  }
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
