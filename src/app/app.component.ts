import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {}
}
