import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  // role:any;
  // ngOnInit(): void {
  //   this.roleObservable.subscribe({
  //     next:(role)=>{
  //       this.role=role;
  //       console.log(this.role)
  //     }
  //   })
  // }

   public roleObservable: BehaviorSubject<string>= new BehaviorSubject("");

  constructor(private httpClient:HttpClient) { }

  getCurrentUser(){
    const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;
    return this.httpClient.get(url)
  }
  // async getRole(){
  //   let role='vesitor';
  //   if(localStorage.getItem('token')){
  //   const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;
  //   await this.httpClient.get(url).subscribe({
  //     next:(data:any)=>{
  //       role= data.role;

  //     }
  //   })
  // }
  // console.log(role);

  // this.roleObservable.next(role);

  // return role
  // }
// onRoleChamge(role:string){
//   console.log(role)
//   this.roleObservable.next(role);
// }
isUser(){
  if (localStorage.getItem('role')==='user'){
    return true
  }
  return false
}
isAdmin(){

  if (localStorage.getItem('role')==='admin'){
    return true
  }
  return false
}
isVesitor(){
  if (!localStorage.getItem('role')){
    return true
  }
  return false
}
}
