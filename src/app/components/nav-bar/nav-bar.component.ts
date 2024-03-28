import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  cartCounter: number = 0;
  constructor(private router: Router, private http: HttpClient, private cartService: CartService) { }
  
  ngOnInit(): void {
    this.cartService.cartCounter$.subscribe(counter => {
      this.cartCounter = counter;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
