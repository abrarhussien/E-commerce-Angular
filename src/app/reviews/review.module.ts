
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './components/review/review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddReviewComponent } from './components/add-review/add-review.component';

import { RatingComponent } from './components/rating/rating.component';
import { NgbRating} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ReviewComponent,AddReviewComponent, RatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReviewRoutingModule,
    NgbRating



  ],
  exports: [ReviewComponent,AddReviewComponent,RatingComponent],
})
export class ReviewModule {}
