import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/Category/ICategory';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  constructor(private CategoryService:CategoryService) { }

  categories:Category[]=[];


  p: number = 1;
  total: number = 0;

  getCategories(){
    this.CategoryService.getAllCategories(this.p)
      .subscribe((response:any)=>{
        console.log(response)
        this.categories=response.data;
        this.total = response.totalCount;
      }
      );
  }

  ngOnInit(): void {
    this.getCategories();
  }




  changeStatus(id:number):void{
    this.CategoryService.changeStatus(id).subscribe(resp=>{
      this.resp='Kategorija je uspešno deaktivirana'
      setTimeout(function() {
        location.reload();
      }, 1800);
     }
      );
  }



  resp:string='';
  delete(id:number):void{
    this.CategoryService.deleteCategory(id).subscribe(resp=>{
      this.resp='Kategorija je uspešno obrisana'
      setTimeout(function() {
        location.reload();
      }, 2100);
     }
      );
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getCategories();
 }
}
