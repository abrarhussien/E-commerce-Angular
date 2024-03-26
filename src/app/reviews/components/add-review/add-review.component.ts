import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css',
})
export class AddReviewComponent  implements OnInit {

  // @Input() productRatingReview!: number;
  @Input() userId!: string;
  @Input() productId!: string;
//  @Output aliData :EventEmitter<any>
@Output() aliData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('exampleModal') exampleModalInput!: ElementRef;
  myForm!: FormGroup;
  addReview: boolean = true;
  updateRev: boolean = false;
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
  dataEdit: object = {
    reviewDetails: '',
  };
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    //this.aliData=new EventEmitter<any>()
  }

  ngOnInit(): void {
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
   addNewReview() {
    this.reviewService.addroductReviews(this.productId, this.dataEnter).subscribe({
      // next: (data) => {console.log(data)
      //   console.log("this.productId",this.productId)
      //   this.aliData.emit(); },
      // complete: () =>this.aliData.emit()
      next: (data) => console.log(data),
      complete: () => this.aliData.emit()

    });
    console.log('id', 'this.dataReview)');
  }
  onSubmit(form: FormGroup) {
    console.log(this.productId);
    if (form.valid) {
      this.dataEnter = {
        reviewDetails: form.value.review,
        user:this.userId,
        product: this.productId,
      };
       this.addNewReview();
       this.aliData.emit();

     // console.log('id', 'this.dataReview)');

    }
  }


}
