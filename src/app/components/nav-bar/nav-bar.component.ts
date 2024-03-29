import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  constructor(private router:Router,private http:HttpClient,private userService:UserService) {
  }
// public roleObservable: BehaviorSubject<string>= new BehaviorSubject("");

  //user:any;
  ngOnInit(){
    this.userService.roleObservable.subscribe({
      next:(role)=>{
        this.role=role;
      }
    })
    this.userService.getCurrentUser();
    this.cartCount=5;
    if(!localStorage.getItem('role')){
      this.role="vesitor"
      // this.userService.onRoleChamge('vesitor')
    }
    else{
      this.role=localStorage.getItem('role')
    }
    // if(localStorage.getItem('token')){
    //   this.userService.getCurrentUser().pipe(
    //       catchError((error) => {
    //         console.error(error);
    //         throw error;
    //       })
    //     )
    //     .subscribe({
    //       next:(res:any)=>{
    //         //this.user=res;
    //         let role="";
    //         res.isAdmin?role="admin":role="user";
    //         this.role=role;
    //         //this.router.navigate(['home']);

    //         //this.userService.onRoleChamge(role)
    //         //this.role="user"
    //       }
    //     });
    //   }
    //   else{this.role="vesitor"}


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
