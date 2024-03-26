import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: Product = {
    _id: '',
    title: '',
    category: { name: '' },
    description: '',
    rating: 0,
    price: 0,
    quantity: 0,
    image: '',
    imageCover: '',
  };
  // data: Product | null = null;
  // data: any;
  showDescription: boolean = true;
  showReview: boolean = false;

  // data: Product | undefined;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.getProduct(this.id);
  }
  toggleView() {
    this.showDescription = !this.showDescription;
  }
  getProduct(id: string) {
    this.productService.getProductsById(id).subscribe((data) => {
      this.data = data;
      console.log('Product ID:', this.data);
      console.log(data);
    });
  }
}
