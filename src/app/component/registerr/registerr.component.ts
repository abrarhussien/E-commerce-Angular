import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterFace } from '../../models/userInterface';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
const emailRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  let password = control.get('password');
  let repassword = control.get('repassword');
  if (password && repassword && password?.value !== repassword?.value) {
    return {
      passwordmatcherror: true,
    };
  }
  return null;
}
@Component({
  selector: 'app-registerr',
  templateUrl: './registerr.component.html',
  styleUrl: './registerr.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private http: HttpClient) {}
  contactForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      // address: new FormControl('', [Validators.required]),
      // phone: new FormControl<number>(20, [
      //   Validators.required,
      //   Validators.minLength(11),
      // ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    },
    { validators: passwordMatchValidator }
  );
  onSubmit() {
    if (!this.contactForm.valid) return;
    const { name, email, password } = this.contactForm.value;
    this.http
      .post<any>(
        'https://node-e-commerce-rlkh.onrender.com/api/users/register',
        {
          name,
          email,
          password,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe((reponse) => {
        console.log('Response:', reponse);
        this.router.navigate(['/login']);
      });
    this.contactForm.reset();
    console.log(this.contactForm.value);
  }
  getRepated(name: string) {
    return (this.contactForm.controls as { [key: string]: any })[name];
  }
}
