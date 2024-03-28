import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  role:any;
  ngOnInit(): void {
    this.roleObservable.subscribe({
      next:(role)=>this.role
    })
  }

  public roleObservable: BehaviorSubject<string>= new BehaviorSubject("");

  constructor(private httpClient:HttpClient) { }

  getCurrentUser(){
    const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;
    return this.httpClient.get(url)
  }
//   getRole(){
//     const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;
//     return this.httpClient.get(url).subscribe({
//       next:(data:any)=>{
//         return data.role;
//       }
//     })
//   }
onRoleChamge(role:string){
  console.log(role)
  this.roleObservable.next(role);
}
isUser(){
  if (this.role==='user'){
    return true
  }
  return false
}
isAdmin(){
  if (this.role==='admin'){
    return true
  }
  return false
}
isVesitor(){
  if (this.role==='vesitor'){
    return true
  }
  return false
}
}
