import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Post/IPost';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(private PostService:PostService) { }


  posts:Post[]=[];


  p: number = 1;
  total: number = 0;

  getPosts(){
    this.PostService.getAllPosts(this.p)
      .subscribe((response:any)=>{
        console.log(response)
        this.posts=response.data;
        this.total = response.totalCount;
      }
      );
  }

  getSearchedPosts(k:string){
    this.PostService.getAllSearchPosts(this.p,k)
      .subscribe((response:any)=>{
        console.log(response)
        this.posts=response.data;
        this.total = response.totalCount;
      }
      );
  }


  onlyActive(items: any[]): any[] {
    return items.filter(p => p.isActive==true);
  }
  
  ngOnInit(): void {
    this.getPosts();
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getPosts();
 }

 onSearchTextEntered(searchValue:string){

   this.getSearchedPosts(searchValue)
 }
}