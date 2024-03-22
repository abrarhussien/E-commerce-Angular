import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from './../../services/review.service';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  id: any;
  userId: string = '65d8884d866dda1b8bbe52c4';

  dataReview: Review[] = [];
  // dataReview: any;
  name!: string;
  image!: string;
  @Input() productName!: string;
  @Input() productRatingReview!: number;
  @ViewChild('exampleModal') exampleModalInput!: ElementRef;
  myForm!: FormGroup;
  formdata: Review = {
    _id: '',
    reviewDetails: '',
    user: { name: '', image: '', _id: '' },
    product: '',
  };
  dataEnter: object = {
    reviewDetails: '',
    user: '',
    product: '',
  };
  openModal() {
    if (this.exampleModalInput != null) {
      this.exampleModalInput.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    if (this.exampleModalInput != null) {
      this.exampleModalInput.nativeElement.style.display = 'none';
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log(this.productName);
    this.getProductReviews();
    console.log(this.exampleModalInput);
    // console.log(this.exampleModalInput);

    this.myForm = this.formBuilder.group({
      review: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
        ],
      ],
    });
  }

  getProductReviews() {
    this.reviewService.getProductReviews(this.id).subscribe((data) => {
      this.dataReview = data;
      // data[0]['user']
      // this.dataReview

      console.log(this.dataReview);
    });
  }
  addNewReview() {
    this.reviewService
      .addroductReviews(this.id, this.dataEnter)
      .subscribe((data) => console.log(data));
    console.log('id', 'this.dataReview)');
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dataEnter = {
        reviewDetails: form.value.review,
        user: this.userId,
        product: this.id,
      };
      this.getProductReviews();
      this.addNewReview();


      // console.log('id', this.dataReview);
    }
  }
}
