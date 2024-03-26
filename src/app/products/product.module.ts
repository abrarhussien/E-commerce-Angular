import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';
import { ReviewModule } from '../reviews/review.module';


@NgModule({
  declarations: [ProductComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
   FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductRoutingModule,
    ReviewModule

  ],
  exports:[]
})
export class ProductModule {}
