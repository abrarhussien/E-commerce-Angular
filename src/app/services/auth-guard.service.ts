import { UserService } from './user.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements OnInit{
  role:any;
  ngOnInit(): void {
    this.userService.roleObservable.subscribe({
      next:(role)=>this.role=role
    })
  }
  constructor(private userService:UserService,private router:Router) { }
  UserCanActivate(){
    if(this.role==="user"||this.role==="admin"){
      return true;
    }else{
      this.router.navigate(["/login"])
      return false}
  }
  // AdminCanActivate(){
  //   if(this.role==="admin"){
  //     return true;
  //   }else{return false}
  // }
}
