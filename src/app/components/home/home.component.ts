import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
// import { CartService } from './../../../../.history/src/app/services/cart.service_20240329200854';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  constructor(private CartService: CartService) {
    this.CartService.getCount()
  }
}
