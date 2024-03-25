import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  allCategors:Category[]=[];
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.findAllCategories();

  }
  findAllCategories(){
    this.categoryService.getAll().subscribe((data)=>{
      this.allCategors=data;
      console.log(data)
    })
  }

}
