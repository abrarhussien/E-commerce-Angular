import { UserService } from './../../services/user.service';

import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserInterFace } from '../../models/userInterface';
import { catchError, throwError } from 'rxjs';
const emailRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService:UserService
  ) {}
  validated = true;

  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  onSubmit(): void {
    if (!this.contactForm.valid) return;
    if (this.contactForm.invalid) {
      return;
    }

    const { email, password } = this.contactForm.value;
    this.http
      .post<any>('https://node-e-commerce-rlkh.onrender.com/api/users/login', {
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          this.validated = false;
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        console.log('Response:', response);
        localStorage.setItem('token', response['token']);
        //localStorage.setItem('id', response['id']);
        const role =response['role'];
        //this.cookieService.set('token', reponse['token']);
        this.userService.onRoleChamge(role)

        this.router.navigate(['/home']);
      });
    this.contactForm.reset();
  }
}
