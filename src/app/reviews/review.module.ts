
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './components/review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddReviewComponent } from './components/add-review/add-review.component';



@NgModule({
  declarations: [ReviewComponent,AddReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReviewRoutingModule,
  ],
  exports: [ReviewComponent,AddReviewComponent],
})
export class ReviewModule {}
