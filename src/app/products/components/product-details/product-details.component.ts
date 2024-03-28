import { CartService } from '../../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'], // Change styleUrl to styleUrls
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: IProduct = {
    _id: '',
    title: '',
    category: { name: '' },
    description: '',
    rating: 0,
    price: 0,
    quantity: 0,
    image: '',
    imageCover: '',
    total: 0
  };
  showDescription: boolean = true;
  showReview: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService, // Inject CartService
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => {
        this.router.navigate(['/cart']);
        this.cartService.incrementCartCounter();
    }})
    // this.cartService.addToCart(product);
  }

  getProduct(id: string) {
    this.productService.getProductsById(id).subscribe((data: any) => {
      this.data = data.data;
    });
  }

}
