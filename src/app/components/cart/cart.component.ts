
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
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

<<<<<<< HEAD
=======

>>>>>>> 7e56ff027da88fed80e01014e30640d6d7305a6c
  constructor(private cartService:CartService) {}


  ngOnInit(): void {
    this.showData()
    this.cartService.getCount()
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => {
        // this.router.navigate(['/cart']);
        this.cartService.incrementCartCounter();
      }
    })
  }

    showData(): void {
    this.cartService.getCartItems().subscribe({
      next: (data:any) => {
        //console.log(data);
        this.cartItems = data.items
        this.total = data.price
      }
    })
  }

  deleteItem(id: string) {

    console.log(id);

    this.cartService.removeCartItem(id).subscribe({
      next: () => {
        // Remove the item from the cartItems array
        this.cartItems = this.cartItems.filter((item: any) => item.productId._id !== id);
        console.log(this.cartItems);

        // Recalculate the total price
        // this.total = this.cartItems.reduce((total: number, item: any) => {
        //   return total + (item.quantity * item.productId.price);
        // }, 0);
        this.cartService.getCount()
      },

      error: (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    });

    }

  increaseQuantity(cartId: any, quantity: any) {
    console.log(quantity);

    this.cartService.updateCart(cartId, ++quantity).subscribe({
      next: (res) => {
        console.log(res);
          this.showData()
          this.calculateTotal();
      }
    })

  }

decreaseQuantity(cartId: any, quantity: any) {
  this.cartService.updateCart(cartId, --quantity).subscribe({
    next: (res) => {
      console.log(res);
      if (quantity === 0) {
        this.deleteItem(cartId); // Delete the item if quantity becomes zero
      } else {
        this.showData();
        this.calculateTotal();
      }
    }
  });
}


    calculateTotal(): void {
    this.total = this.cartItems.reduce((total: number, item: any) => {
      return total + (item.quantity * item.productId.price);
    }, 0);
  }

}
