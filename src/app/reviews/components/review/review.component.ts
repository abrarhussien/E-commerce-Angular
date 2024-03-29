import { ActivatedRoute, Router } from '@angular/router';
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
  input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',

})
export class ReviewComponent implements OnInit {

  currentPage: number = 0;
  totalPages: number = 0;
  page: any;
  limit:number=3;
  totalPagesArray: number[] = [];
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCurrentUser();
  }
  id: any;

  userId!: string;
  // userId: string ="6600ef79ae7cf1ca32567fbb";
  // headers = new HttpHeaders().set('user', this.userId);
  updateData!: FormGroup;
  dataReview: Review[] = [];
  // dataReview: any;
  name!: string;
  image!: string;
  idEditReview!: string;
  itemEdit!: any;
  @Input() productName!: string;
  @Input() productRatingReview!: number;


  @ViewChild('exampleModal') exampleModalInput!: ElementRef;
  myForm!: FormGroup;
  addReview: boolean = true;
  updateRev: boolean = false;
  formdata: Review = {
    _id: '',
    reviewDetails: '',
    rating: 0,
    user: { name: '', image: '', _id: '' },
    product: '',

  };
  dataEnter: object = {
    reviewDetails: '',
    user: '',
    product: '',
    rating: 0,
  };
  dataEdit: object = {
    reviewDetails: '',
  };
  updateFormGroup: any;

  ngOnInit(): void {
    this.page = this.route.snapshot.queryParamMap.get('page');
    console.log(+this.page);
    this.currentPage = this.page || 1;
    this.getCurrentUser();

    console.log(this.exampleModalInput);
    // console.log(this.exampleModalInput);
    this.id = this.route.snapshot.paramMap.get('id');

    this.myForm = this.formBuilder.group({
      review: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
        ],
      ],rating: [
        0,
        [
          Validators.required,

        ],
      ],
    });
    // this.id = this.route.snapshot.paramMap.get('id');

    // this.route.paramMap.subscribe((param) => {
    //   const id = param.get(`id`);
    //   this.deleteReview(id);
    // });
    console.log(this.id);
    console.log(this.productName);
    this.getProductReviews(this.currentPage);
  }
  getCurrentUser() {
    this.reviewService.getCurrentUser().subscribe((response: any) => {
      console.log('id111', response);
      this.userId = response._id;
    });
  }
  getProductReviews(page:number) {
    this.reviewService.getProductReviews(page,this.id).subscribe((data:any) => {
      console.log("review",data)
      this.dataReview = data.data;
      this.currentPage = data.paginationResult.currentPage;
        this.limit=data.paginationResult.limit;

        this.totalPages = data.paginationResult.numberPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i
        );
      // data[0]['user']
      // this.dataReview

      console.log(this.dataReview);
    });
  }
  add(){
    this.addReview=true;
    this.updateRev=false;
    this.myForm.reset()
    this.openModal();
  }

  // deleteReview(id: string) {
  //   const headers = new HttpHeaders();
  //   headers.set('user', this.userId);
  //   this.reviewService.deleteProductReviews(id, headers).subscribe({
  //     next: (data) => {
  //       console.log(headers, data);
  //       this.dataReview = this.dataReview.filter((review) => review._id !== id);
  //     },

  //     error: (err) => {
  //       alert(err.message);
  //     },
  //   });
  // }

  deleteReview(id: any) {
    this.reviewService.deleteProductReviews(id).subscribe({
      next: (data) => {
        this.dataReview = this.dataReview.filter(
          (review) => review._id != id
        );
        console.log(data);

      },
      error: (err) => {
        //console.error('Error deleting review:', err);
      alert('Error deleting review: ' + err.message);
      },
    });
  }

  // confirmDelete(id: string, name: string): void {
  //   const isConfirmed = confirm(`Are you sure you want to delete ${name}?`);

  //   if (isConfirmed) {
  //     this.deleteReview(id);
  //   }
  // }

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
  // addNewReview() {
  //   this.reviewService.addroductReviews(this.id, this.dataEnter).subscribe({
  //     next: (data) => console.log(data),
  //     complete: () => this.getProductReviews(),
  //   });
  //   console.log('id', 'this.dataReview)');
  // }

  onSubmit(form: FormGroup) {
    console.log(this.id);
    if (form.valid) {
      console.log("form.value.rating",form.value.rating)
      this.dataEnter = {
        reviewDetails: form.value.review,
        rating: form.value.rating,
        user: this.userId,
        product: this.id,
      };
      //  this.addNewReview();
      this.reviewService.addroductReviews(this.id, this.dataEnter).subscribe({
        next: (data) => console.log(data),
        complete: () => this.getProductReviews(this.currentPage),
      });
      console.log('id', 'this.dataReview)');

      // this.router.navigate(['product-detail']);

      // console.log('id', this.dataReview);
    }
  }
  onupdata(form: FormGroup) {
    if (form.valid) {
      this.dataEdit = {
        reviewDetails: form.value.review,
        user: this.userId,
      };
      this.reviewService
        .updateoductReviews(this.dataEdit, this.idEditReview)
        .subscribe({
          next: (data) => console.log(data),
          error: (err) => console.log(err),
          complete: () => this.getProductReviews(this.currentPage),
        });
    }
  }
  EditReview(itemEdit: any, idEditReview: string) {
    this.idEditReview = idEditReview;
    this.itemEdit = itemEdit;
    // this.myForm.get('review')?.setValue(id.review);
    this.myForm.patchValue({
      review: itemEdit.reviewDetails,
      user: itemEdit.user,
    });

    this.addReview = false;
    this.updateRev = true;
    this.openModal();
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {

      this.currentPage = newPage;
      this.router.navigate(['/product-detail',this.id],{
        queryParams: { page: this.currentPage + 1 },
      });
      // this.getAllProducts(this.currentPage , this.sortField);

        this.getProductReviews(this.currentPage+1)

console.log("pagesss",this.router)
      }
  }

}

