import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category/ICategory';
import { Tag } from 'src/app/interfaces/Tag/ITag';
import { CategoryService } from 'src/app/services/Category/category.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TagService } from 'src/app/services/Tag/tag.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  addPost:FormGroup;

  constructor(private pService:PostService,private cS:CategoryService,private fb:FormBuilder,private ts:TagService) {
      this.addPost=this.fb.group({
        CategoriesIds:this.fb.array([],Validators.required),
        Title:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
        Description:this.fb.control('',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]),
        Image:this.fb.control(''),
        fileSource:this.fb.control('',Validators.required),
        TagsIds:this.fb.array([],Validators.required),
      })
   }

   get f(){return this.addPost.controls;}


  categories:Category[]=[];
   tags:Tag[]=[];

  getCategories(){
    this.cS.getAllPostCategories()
    .subscribe((response:any)=>{
      console.log(response)
      this.categories=response.data;
      }
      );
  }

  onlyActive(items: any[]): any[] {
    return items.filter(p => p.isActive==true);
  }

  getTags(){
    this.ts.getPostTags()
    .subscribe((response:any)=>{
      console.log(response)
      this.tags=response.data;
      }
      );
  }

  user:any=JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
  }

  onCbChg(event:any) {
    const CategoriesIds:FormArray=this.addPost.get('CategoriesIds') as FormArray;
    if(event.target.checked){
       CategoriesIds.push(new FormControl(event.target.value))
    }
    else{
      var i=0;
      CategoriesIds.controls.forEach((element:any) => {
         if(element.value==event.target.value){
          CategoriesIds.removeAt(i);
          return;
         }
         i++;
      });
    }
  } 
  onCbChg2(event:any) {
    const TagsIds:FormArray=this.addPost.get('TagsIds') as FormArray;
    if(event.target.checked){
       TagsIds.push(new FormControl(event.target.value))
    }
    else{
      var i=0;
      TagsIds.controls.forEach((element:any) => {
         if(element.value==event.target.value){
          TagsIds.removeAt(i);
          return;
         }
         i++;
      });
    }
  } 
  
  


  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addPost.patchValue({
        fileSource: file
      });
    }
  } 

  resp:string='';
  resp2:string='';
  onSubmit():void{
   // console.log(this.addPost.value)
    var formData: any = new FormData();
    
    formData.append('Title', this.addPost.get('Title').value);
    formData.append('Description', this.addPost.get('Description').value);
    formData.append('UserId', this.user.id);
    this.addPost.get('TagsIds').value.forEach(element => {
         formData.append('TagsIds',element)
    });
    this.addPost.get('CategoriesIds').value.forEach(element => {
      formData.append('CategoriesIds',element)
   });
    formData.append('Image', this.addPost.get('fileSource')?.value);


    this.pService.addPost(formData).subscribe
    (resp=>{
      this.resp='Post je uspešno kreiran'
      setTimeout(function() {
        location.reload();
      }, 1500);
    },(error:HttpErrorResponse)=>{
      console.log(error)
      if(error.status==500){
        this.resp2="Dozvoljene ekstenzije su: .jpg, .png, .jpeg, .gif ,.JPG, .PNG,.JPEG, .GIF";
      }
    });
    
  }

}
