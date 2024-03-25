import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { ProductService } from './../../services/product.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-dashboard-edit-product',
  templateUrl: './dashboard-edit-product.component.html',
  styleUrl: './dashboard-edit-product.component.css',
})
export class DashboardEditProductComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  subscriptions = new Subscription();
  product = new FormGroup({
    _id: new FormControl(),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(60),
    ]),
    category: new FormControl('1', [Validators.required]),
    imageCover: new FormControl('', [Validators.required]),
    quantity:new FormControl(0,[Validators.required])

  });

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.productService.getProductById(id).subscribe({
              next: (product:any) => {
                this.product.patchValue({...product.data, category: product.data.category._id});
              },
              error: (err) => {
                console.log(err.message);
              },
            });
          }
        },
      })
    );
    this.subscriptions.add(
      this.categoriesService.getCategories().subscribe({
        next: (categories:any) => {
          this.categories = categories.data;
        },
        error: (err) => {
          console.log(err.message);
        },
      })
    );

    //@ts-ignore
  }

  categories: any;


  editProduct() {
    //@ts-ignore
    this.subscriptions.add(
      this.productService
        .editProduct(this.product.value as IProduct)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard/products']);
          },
          error: (err) => {
            alert(err.message);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
