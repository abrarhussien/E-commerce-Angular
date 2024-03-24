import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css',
})
export class AddReviewComponent  {
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}



}
