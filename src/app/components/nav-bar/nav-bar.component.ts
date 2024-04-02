import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  constructor(private router:Router,private http:HttpClient,private userService:UserService, private CartService:CartService) {
  }

  ngOnInit(){
    this.userService.roleObservable.subscribe({
      next:(role)=>{
        this.role=role;
      }
    })
    this.userService.getCurrentUser();
    this.cartCount= 0;
    if(!localStorage.getItem('role')){
      this.role="vesitor"
      // this.userService.onRoleChamge('vesitor')
    }
    else{
      this.role=localStorage.getItem('role')
    }
    this.CartService.getCount()
    this.CartService.cartCounterSubject.subscribe({
      next: (value) => {
        this.cartCount = value;
      }
    })

  }


  cartCount:number=0;
  role :any;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.role="vesitor";
    //this.role="vesitor";
    this.router.navigate(['/home']);
  }


}
