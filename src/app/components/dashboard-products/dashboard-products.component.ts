import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IProduct } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrl: './dashboard-products.component.css',
})
export class DashboardProductsComponent implements OnInit, OnDestroy {
  constructor(private productsService: ProductService) {}
  products: IProduct[] = [];
  loading =false;

  subscriptions = new Subscription();
  ngOnInit(): void {
    this.loading=true;
    this.subscriptions.add(
      this.productsService.getProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.loading=false;
        },
        error:(err)=>{alert(err.message)}
      })
    );
  }
  deleteProduct = (id: string) => {
    this.subscriptions.add(
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.products=this.products.filter((product: IProduct) => product.id !== id);
        },
        error: (err) => {
          alert(err.message);
        },
      })
    );
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
