import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-dashboard-add-product',
  templateUrl: './dashboard-add-product.component.html',
  styleUrl: './dashboard-add-product.component.css',
})
export class DashboardAddProductComponent implements OnDestroy ,OnInit {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.categoriesService.getCategories().subscribe({
        next: (categories:any) => {
          this.categories = categories.data;
        },
        error: (err) => {
          console.log(err.message);
        }
      })
      )
  }

  subscriptions = new Subscription();

  product = new FormGroup({
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
    category: new FormControl('', [Validators.required]),
    imageCover: new FormControl('', [Validators.required]),
    quantity:new FormControl(0,[Validators.required])
  });

  categories:any;



  addProduct() {
    //@ts-ignore
    this.subscriptions.add(
      this.productService.addProduct(this.product.value as unknown as IProduct).subscribe({
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
