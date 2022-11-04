import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/Category/ICategory';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private cs:CategoryService) { }

  cas:Category[]=[];

 
  onlyActive(items: any[]): any[] {
    return items.filter(p => p.isActive==true);
  }

  getCas(){
    this.cs.getAllPostCategories()
      .subscribe((response:any)=>{
        console.log(response)
        this.cas=response.data;
      }
      );
  } 
  ngOnInit(): void {
    this.getCas()
  }

}
