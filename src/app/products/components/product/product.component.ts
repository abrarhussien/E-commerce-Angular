import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  allProduct: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  page: any;
  totalPagesArray: number[] = [];
  //sortField='category', sortOrder
  sortField: any = 'category';
  sortOrder: any = 'asc';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // this.userService.getAll().subscribe((data)=>{
  //   this.allUsers=data;
  // })
  ngOnInit(): void {
    this.page = this.route.snapshot.queryParamMap.get('page');
    this.sortField = this.route.snapshot.queryParamMap.get('sortField');

    this.sortOrder = this.route.snapshot.queryParamMap.get('sortOrder');
    console.log(+this.page);
    this.currentPage = this.page || 1;
    this.getAllProducts(this.currentPage, this.sortField, this.sortOrder);
    // this.route.queryParams.subscribe(params => {

    //   const page = +params['page'] || 1; // If no page parameter is provided, default to 1
    //   this.getAllProducts(page);
    // });
  }

  getAllProducts(page: number, sortField: string, sortOrder: string): void {
    this.productService.getAllProducts(page, sortField, sortOrder).subscribe({
      next: (data: any) => {
        this.allProduct = data.products;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i
        );
      },
      error: (err) => alert('Error'),
    });
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.router.navigate(['/products'], {
        queryParams: { page: this.currentPage + 1 },
      });
      this.getAllProducts(this.currentPage + 1, this.sortField, this.sortOrder);
    }
  }
  sorting(event: any) {
    let value = event.target.value;
    console.log(value);
    //let value = event.target.value;
    //console.log(value); // Just for debugging, you can remove this line
    const [sortField, sortOrder] = value.split('-');
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.router.navigate(['/products'], {
      queryParams: { sortField, sortOrder, page: this.currentPage }, // Reset page to 1 when sorting changes
    });
    this.getAllProducts(this.currentPage, sortField, sortOrder);
  }
}
