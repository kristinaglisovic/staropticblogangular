import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAddCategoryRequest } from 'src/app/interfaces/Category/IAddCategoryRequest';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }
  category:any;

  addCategory:FormGroup;

  ngOnInit(): void {
    this.addCategory=new FormGroup({
      name:new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      description:new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    });
  }
  get f(){return this.addCategory.controls;}
  resp:string='';
  onSubmit():void{
    
    const addCategoryRequest:IAddCategoryRequest={
      name:this.addCategory.value.name,
      description:this.addCategory.value.description,
    }

    this.categoryService.addCategory(addCategoryRequest).subscribe
    (resp=>{
      this.resp='Kategorija je uspešno kreirana'
      setTimeout(function() {
        location.reload();
      }, 1500);
    });
    
  }
}
