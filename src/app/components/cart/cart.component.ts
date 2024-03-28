import { CartService } from './../../services/cart.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product.model';
// import { filter } from 'dom7';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:any = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data:any) => {
        console.log(data);
        this.cartItems = data.items
        this.total = data.price
    }})
    // this.calculateTotal();
  }

  deleteItem(id: string) {
    console.log(id);
    this.cartService.removeCartItem(id).subscribe({
      next: () => {
        const newCartItems = this.cartItems.filter((item: any) => item.productId._id === id)
        this.cartItems = newCartItems
    }})
  }

    // calculateTotal(): void {
    // this.subtotal = this.cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    // this.total = this.subtotal;
  // }


}
