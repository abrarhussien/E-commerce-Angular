import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  allCategors:Category[]=[];
  constructor(private categoryService:CategoriesService){

  }
  ngOnInit(): void {
    this.findAllCategories();

  }
  findAllCategories(){
    this.categoryService.getCategories().subscribe({
      next:(result:any)=>{
        this.allCategors=result.data;
      }})
  }

}
