import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUpdateCategoryRequest } from 'src/app/interfaces/Category/IUpdateCategoryRequest';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-admin-view-category',
  templateUrl: './admin-view-category.component.html',
  styleUrls: ['./admin-view-category.component.css']
})
export class AdminViewCategoryComponent implements OnInit {

  constructor(private route:ActivatedRoute,private categoryService:CategoryService) { }
  errorMessage:any;
  category:any;
  isReady: boolean=false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
      const id=params.get('id');
        if(id){
        this.categoryService.getOneCategoryById(id).subscribe(response=>{
          console.log(response)
          this.category=response;
          this.isReady=true;
          },(error)=>{
            console.log(error);
            this.errorMessage=error;
          }
          );
        }
      }
    )
  }
  resp:string='';
  onSubmit():void{
    const updateCategoryRequest:IUpdateCategoryRequest={
      name:this.category.name,
      isActive:this.category.isActive,
      description:this.category.description,
      updatedAt:this.category.updatedAt
    }

    this.categoryService.updateCategory(this.category?.id,updateCategoryRequest).subscribe
    (resp=>{
      this.resp='Kategorija je uspešno ažurirana'
      setTimeout(function() {
        location.reload();
      }, 2100);
    })
  }
}
