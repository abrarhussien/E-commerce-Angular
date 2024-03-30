import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Subject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient:HttpClient) {}
  getProducts(page: number, sortField:string) {
    return this.httpClient.get<any[]>(`https://node-e-commerce-rlkh.onrender.com/api/v1/products?page=${page}&sort=${sortField}&limit=10`);
  }
  getProductById(id: string) {
    //console.log(id)
    return this.httpClient.get<IProduct>(
      'https://node-e-commerce-rlkh.onrender.com/api/v1/products/' + id
    );
  }
  addProduct(product: IProduct) {
    return this.httpClient.post('https://node-e-commerce-rlkh.onrender.com/api/v1/products', product);
  }
  editProduct(newProduct: IProduct) {
    //console.log(newProduct)
    return this.httpClient.put(
      'https://node-e-commerce-rlkh.onrender.com/api/v1/products/' + newProduct._id,
      newProduct
    );
  }
  deleteProduct(id: string) {
    //console.log(id)
    return this.httpClient.delete('https://node-e-commerce-rlkh.onrender.com/api/v1/products/' + id);
  }
  getFilteredProducts(
    page:number,
    limit:number,
    search:{key:string,value:string}[],
    sort:{by:string,direction:string}

  ){
    let queryParams= new HttpParams()
    queryParams= queryParams.append("page",page);
    queryParams= queryParams.append("limit",limit);
    queryParams=queryParams.append("sort",sort.direction==="desc"?"-"+sort.by:sort.by);
    search.map((search)=>queryParams=queryParams.append(search.key,search.value));

    return this.httpClient.get('https://node-e-commerce-rlkh.onrender.com/api/v1/products',{params:queryParams})
    //ocalhost:8001/api/v1/products?page=1&ratingsAverage[lte]=4&price[gte]=55.99&sort=-sold,price&keyword=Casual&limit=5


  }
  // productsSubject=new BehaviorSubject<IProduct[]>([
  //   {
  //     id: '1',
  //     title: 'abrar',
  //     image:
  //       'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
  //     price: 200,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '2',
  //     title: 'abrar2',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCR35tkwOXBNphm7trXmiNuJm6PN_L88vsMZbIWnmPA&s',
  //     price: 1000,
  //     details: 'accepted',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '3',
  //     title: 'abrar3',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDIHCXL1wEEeT71cG3jZYYIaptrsKBRX9tI-UEc3MUw&s',
  //     price: 800,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '4',
  //     title: 'abrar4',
  //     image:
  //       'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
  //     price: 700,
  //     details: 'rejected',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '5',
  //     title: 'abrar5',
  //     image:
  //       'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L2hpcHBvdW5pY29ybjc2X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX2xhcHRvcF9pc29sYXRlX2lsbHVzdF85ODc5ZmYwOS1iMjM5LTQ2ZDItYWM2Yi1iYzcwMjI3MGJmZTQucG5n.png',
  //     price: 400,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '6',
  //     title: 'abrar6',
  //     image:
  //       'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
  //     price: 590,
  //     details: 'accepted',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '7',
  //     title: 'abrar7',
  //     image:
  //       'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L2hpcHBvdW5pY29ybjc2X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX2xhcHRvcF9pc29sYXRlX2lsbHVzdF85ODc5ZmYwOS1iMjM5LTQ2ZDItYWM2Yi1iYzcwMjI3MGJmZTQucG5n.png',
  //     price: 830,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '8',
  //     title: 'abrar8',
  //     image:
  //       'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
  //     price: 2900,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '9',
  //     title: 'abrar9',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCR35tkwOXBNphm7trXmiNuJm6PN_L88vsMZbIWnmPA&s',
  //     price: 1200,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '10',
  //     title: 'abrar10',
  //     image:
  //       'https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
  //     price: 2200,
  //     details: 'rejected',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '11',
  //     title: 'abrar11',
  //     image:
  //       'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg',
  //     price: 846,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '12',
  //     title: 'abrar12',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDIHCXL1wEEeT71cG3jZYYIaptrsKBRX9tI-UEc3MUw&s',
  //     price: 8746,
  //     details: 'accepted',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '13',
  //     title: 'abrar13',
  //     image:
  //       'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg',
  //     price: 860,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '14',
  //     title: 'abrar14',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCR35tkwOXBNphm7trXmiNuJm6PN_L88vsMZbIWnmPA&s',
  //     price: 870,
  //     details: 'rejected',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '15',
  //     title: 'abrar15',
  //     image:
  //       'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L2hpcHBvdW5pY29ybjc2X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX2xhcHRvcF9pc29sYXRlX2lsbHVzdF85ODc5ZmYwOS1iMjM5LTQ2ZDItYWM2Yi1iYzcwMjI3MGJmZTQucG5n.png',
  //     price: 960,
  //     details: 'rejected',
  //     category: "1",
  //     subCategory:"1"
  //   },
  //   {
  //     id: '16',
  //     title: 'abrar16',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDIHCXL1wEEeT71cG3jZYYIaptrsKBRX9tI-UEc3MUw&s',
  //     price: 904,
  //     details: 'pending',
  //     category: "1",
  //     subCategory:"1"
  //   },
  // ])

  // getProducts() {
  //   return this.productsSubject.value;
  // }

  // getProductById(id:string) {
  //   return this.getProducts().find((item)=>item.id===id);
  // }

  // deleteProduct(id: string) {
  //   const newProducts = this.getProducts().filter((item) => item.id !== id);
  //   this.productsSubject.next(newProducts);

  // }

  // //@ts-ignore
  // addProduct(product) {
  //   const id= Math.floor(Math.random() * 1000000000000)
  //   const newProducts = this.getProducts();
  //   newProducts.push({...product, id});
  //   this.productsSubject.next(newProducts);
  // }

  // editProduct(product: IProduct) {
  //   const newProducts = this.getProducts();
  //   const i=newProducts.findIndex((item)=>product.id===item.id);
  //   newProducts[i]={...product}
  //   this.productsSubject.next(newProducts);

  // }
}
