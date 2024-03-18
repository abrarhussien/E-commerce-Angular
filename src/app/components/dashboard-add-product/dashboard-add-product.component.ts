import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-dashboard-add-product',
  templateUrl: './dashboard-add-product.component.html',
  styleUrl: './dashboard-add-product.component.css',
})
export class DashboardAddProductComponent implements OnDestroy {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  subscriptions = new Subscription();

  product = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(60),
    ]),
    category: new FormControl('1', [Validators.required]),
    subCategory: new FormControl('1', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  categories = this.categoriesService.getCategories();

  subCategories = this.categoriesService.getSubCategories(
    //@ts-ignore
    this.product.value.category
  );

  getSubs() {
    this.subCategories = this.categoriesService.getSubCategories(
      //@ts-ignore
      this.product.value.category
    );
  }
  addProduct() {
    //@ts-ignore
    this.subscriptions.add(
      this.productService.addProduct(this.product.value as IProduct).subscribe({
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
