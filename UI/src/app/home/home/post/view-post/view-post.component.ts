import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/Category/category.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private route:ActivatedRoute,private postService:PostService) { }
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

}
