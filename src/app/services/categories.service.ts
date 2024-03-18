import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  catgories = [
    { id:1 , name: '1', subCategorys: ['1', '2', '3'] },
    { id:2 ,name: '2', subCategorys: ['4', '5', '6'] },
    { id:3 ,name: '3', subCategorys: ['7', '8', '9'] },
    { id:4 ,name: '4', subCategorys: ['10', '11', '12'] },
    { id:5 ,name: '5', subCategorys: ['13', '14', '15'] }  ];

    getCategories(){
      return this.catgories.map((item)=>item)
    }

    getSubCategories(name:string){
      return (this.catgories.find((item)=>item.name===name))?.subCategorys;
    }


}
