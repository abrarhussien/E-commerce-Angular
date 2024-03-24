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
import { CookieService } from 'ngx-cookie-service';
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
    private cookieService: CookieService
  ) {}
  validated = true;

  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
  });
  onSubmit(): void {
    if (!this.contactForm.valid) return;
    if (this.contactForm.invalid) {
      return;
    }

    const { email, password } = this.contactForm.value;
    this.http
      .post<any>('http://localhost:8001/api/users/login', {
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
      .subscribe((reponse) => {
        console.log('Response:', reponse);
        localStorage.setItem('token', reponse['token']);
        //this.cookieService.set('token', reponse['token']);
        this.router.navigate(['/']);
      });
    this.contactForm.reset();
  }
}