import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/Category/ICategory';
import { IUpdatePostRequest } from 'src/app/interfaces/Post/IUpdatePostRequest';
import { Tag } from 'src/app/interfaces/Tag/ITag';
import { CategoryService } from 'src/app/services/Category/category.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-admin-view-post',
  templateUrl: './admin-view-post.component.html',
  styleUrls: ['./admin-view-post.component.css']
})
export class AdminViewPostComponent implements OnInit {

  constructor(private route:ActivatedRoute,private postService:PostService,private categoriesservice:CategoryService,private tagS:TagService,private fb:FormBuilder) { }
  errorMessage:any;
  post:any;
  isReady: boolean=false;
 

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
      const id=params.get('id');
        if(id){
        this.postService.getOnePostById(id).subscribe(response=>{
          console.log(response)
          this.post=response;
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
    const updatePostRequest:IUpdatePostRequest={
      title:this.post.title,
      isActive:this.post.isActive,
      description:this.post.description,
      updatedAt:this.post.updatedAt,
     
    }

    this.postService.updatePost(this.post?.id,updatePostRequest).subscribe
    (resp=>{
      this.resp='Post je uspešno ažuriran'
      setTimeout(function() {
        location.reload();
      }, 2100);
    })
  }

  
}
