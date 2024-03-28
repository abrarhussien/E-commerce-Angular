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
  categoryId:any;
  limit:number=6;
  totalPagesArray: number[] = [];
  //sortField='category', sortOrder
  sortField: any ;

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
    //this.sortField = this.route.snapshot.queryParamMap.get('sortField');

    //this.sortOrder = this.route.snapshot.queryParamMap.get('sortOrder');
    // console.log(+this.page);
    this.currentPage = this.page || 1;

    // this.route.queryParams.subscribe(params => {

    //   const page = +params['page'] || 1; // If no page parameter is provided, default to 1
    //   this.getAllProducts(page);


    // });
    // this.getAllProducts(this.currentPage, this.sortField);

    this.categoryId = this.route.snapshot.paramMap.get('id');
    // console.log(this.categoryId)
    if(this.categoryId){
      this.getProductsByCategoryId(this.categoryId,this.currentPage, this.sortField)
    }else{
      this.getAllProducts(this.currentPage, this.sortField);
    }
  }

  getAllProducts(page: number,sortField: string): void {
    this.productService.getAllProducts(page, sortField).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.allProduct = data.data;
        this.currentPage = data.paginationResult.currentPage;
        this.limit=data.paginationResult.limit;
        this.totalPages = data.paginationResult.numberPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i
        );
      },
      error: (err) => alert('Error'),
    });
  }


  getProductsByCategoryId(id:any,page: number,sortField: string): void {
    this.productService.getProductsByCategory(id,page, sortField).subscribe({
      next: (data: any) => {
        console.log(data)
        this.allProduct = data.data;
        this.currentPage = data.paginationResult.currentPage;
        this.limit=data.paginationResult.limit;
        this.totalPages = data.paginationResult.numberPages;
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
      if(this.categoryId){
      this.currentPage = newPage;
      this.router.navigate(['/home/category', this.categoryId, 'product'], {
        queryParams: { page: this.currentPage + 1 },
      });
      // this.getAllProducts(this.currentPage , this.sortField);

        this.getProductsByCategoryId(this.categoryId,this.currentPage+1, this.sortField)
      }else{
        this.currentPage = newPage;
        this.router.navigate(['/products'], {
          queryParams: { page: this.currentPage + 1 },
        });

        this.getAllProducts(this.currentPage+1, this.sortField);
      }
    }
  }
  sorting(event: any) {

    // this.getAllProducts(this.currentPage, sortField);
    if(this.categoryId){
      let value = event.target.value;
      console.log(value);
      //let value = event.target.value;
      //console.log(value); // Just for debugging, you can remove this line
      const sortField= value
      this.sortField = value;
      // this.sortOrder = sortOrder;
      this.router.navigate(['/home/category', this.categoryId, 'product'], {
        queryParams: { sortField, page: this.currentPage }, // Reset page to 1 when sorting changes
      });
      this.getProductsByCategoryId(this.categoryId,this.currentPage, this.sortField)
    }else{
      let value = event.target.value;
      console.log(value);
      //let value = event.target.value;
      //console.log(value); // Just for debugging, you can remove this line
      const sortField= value
      this.sortField = value;
      // this.sortOrder = sortOrder;
      this.router.navigate(['/products'], {
        queryParams: { sortField, page: this.currentPage }, // Reset page to 1 when sorting changes
      });
      this.getAllProducts(this.currentPage, this.sortField);
    }
  }
}
