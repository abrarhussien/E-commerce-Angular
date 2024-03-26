import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

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
  currentPage=1;
  limit=10;

  search=[{key:"name", value:"laptop"}]
  sort={
    by:"name",
    direction:"desc"

  };

  subscriptions = new Subscription();
  ngOnInit(): void {
    this.loading=true;
    this.subscriptions.add(
      this.productsService.getProducts().subscribe({
        next: (products:any) => {
          this.products = products.data;
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
          this.products=this.products.filter((product: IProduct) => product._id !== id);
        },
        error: (err) => {
          alert(err.message);
        },
      })
    );
  };

  getFilteredProducts(){
    this.productsService.getFilteredProducts(this.currentPage,this.limit,this.search,this.sort).subscribe({
      next:(filteredProducts:any)=>this.products=filteredProducts.data,
      error:(err)=>alert(err.message)

    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
