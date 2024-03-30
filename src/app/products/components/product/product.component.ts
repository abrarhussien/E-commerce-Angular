import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
  searchfilter:any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // this.userService.getAll().subscribe((data)=>{
  //   this.allUsers=data;
  // })
  ngOnInit(): void {


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe(event => {
        console.log(event);

        this.page = this.route.snapshot.queryParamMap.get('page');
        this.searchfilter = this.route.snapshot.queryParamMap.get('title');
        this.sortField = this.route.snapshot.queryParamMap.get('sortField');
        this.currentPage = this.page || 1;

        this.categoryId = this.route.snapshot.paramMap.get('id');
        console.log(this.sortField)
        if(this.categoryId){
          this.getProductsByCategoryId(this.categoryId,this.currentPage, this.sortField,this.searchfilter)
        }else{
          this.getAllProducts(this.currentPage, this.sortField,this.searchfilter);
        }
          //console.log((event as NavigationEnd));

      });

      this.page = this.route.snapshot.queryParamMap.get('page');
      this.currentPage = this.page || 1;

      this.searchfilter = this.route.snapshot.queryParamMap.get('title');
      this.sortField = this.route.snapshot.queryParamMap.get('sort');

      this.categoryId = this.route.snapshot.paramMap.get('id');

      if(this.categoryId){
        this.getProductsByCategoryId(this.categoryId,this.currentPage, this.sortField,this.searchfilter)
      }else{
        this.getAllProducts(this.currentPage, this.sortField,this.searchfilter);
      }

    //this.searchfilter = this.route.snapshot.queryParamMap.get('title')||"";
    // this.productService.searchKeyword.subscribe({
    //   next:(data)=>{
    //     this.searchfilter=data
    //   }
    // })


  }

  getAllProducts(page: number,sortField: string , search:string): void {
    //console.log(search)
    this.productService.getAllProducts(page, sortField,search).subscribe({
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


  getProductsByCategoryId(id:any,page: number,sortField: string,search:string): void {
    this.productService.getProductsByCategory(id,page, sortField,search).subscribe({
      next: (data: any) => {
        //console.log(data)
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
      // this.router.navigate(['/home/category', this.categoryId, 'product'], {
      //   queryParams: { page: this.currentPage + 1 },
      // });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage + 1
        },
        queryParamsHandling: 'merge',
      });
      // this.getAllProducts(this.currentPage , this.sortField);

        this.getProductsByCategoryId(this.categoryId,this.currentPage+1, this.sortField,this.searchfilter)
      }else{
        this.currentPage = newPage;
        // this.router.navigate(['/products'], {
        //   queryParams: { page: this.currentPage + 1 },
        // });
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: this.currentPage + 1
          },
          queryParamsHandling: 'merge',
        });

        //this.getAllProducts(this.currentPage+1, this.sortField, this.searchfilter);
      }
    }
  }
  sorting(event: any) {

    // this.getAllProducts(this.currentPage, sortField);
    if(this.categoryId){
      let value = event.target.value;
      //console.log(value);
      //let value = event.target.value;
      //console.log(value); // Just for debugging, you can remove this line
      const sortField= value
      this.sortField = value;
      // this.sortOrder = sortOrder;
      // this.router.navigate(['/category', this.categoryId, 'product'], {
      //   queryParams: { sortField, page: this.currentPage }, // Reset page to 1 when sorting changes
      // });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sortField,
          page:1
        },
        queryParamsHandling: 'merge',
      });
     //this.getProductsByCategoryId(this.categoryId,this.currentPage, this.sortField,this.searchfilter)
    }else{
      let value = event.target.value;
      //console.log(value);
      //let value = event.target.value;
      //console.log(value); // Just for debugging, you can remove this line
      const sortField= value
      this.sortField = value;
      // this.sortOrder = sortOrder;
      // this.router.navigate(['/products'], {
      //   queryParams: { sortField, page: this.currentPage }, // Reset page to 1 when sorting changes
      // });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sortField,
          page:1
        },
        queryParamsHandling: 'merge',
      });
      //this.getAllProducts(this.currentPage, this.sortField,this.searchfilter);
    }
  }
}
