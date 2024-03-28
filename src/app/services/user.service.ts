import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
}
