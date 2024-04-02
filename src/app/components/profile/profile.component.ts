import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {


  constructor(private http: HttpClient) {
    this.onLoginSuccess();
  }

  ngOnInit(): void {

    this.onLoginSuccess();
    this.getUserProfile();

  }

  user= {name:"",email:""};

  onLoginSuccess(): void {
    //console.log("aaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhh");

    const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;
    // const token: string = localStorage.getItem('token') as string
    // console.log(token)
    // let headers = new HttpHeaders({ 'jwt': `Bearer ${token}` });
    // console.log(headers)
    this.http
      .get(url)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((response: any) => {
          //console.log(response);
        this.user.name = response.name;
        this.user.email = response.email;

      });
  }


  editMode = false; // Flag to track edit mode

  getUserProfile(): void {
    const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;

    this.http.get(url)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((response: any) => {
        //console.log(response);
        this.user.name = response.name;
        this.user.email = response.email;

      });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

updateUserProfile(): void {
  const url = `https://node-e-commerce-rlkh.onrender.com/api/profile`;


  this.http.patch(url, this.user)
    .pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
    .subscribe((response: any) => {
      //console.log(response);
      this.editMode = false;
      // Optionally, you can show a success message to the user
      // Or navigate back to the profile page
    });
  }
cancelUpdate(): void {
      this.editMode = false;
  }


}
