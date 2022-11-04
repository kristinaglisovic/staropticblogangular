import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Post/IPost';
import { PostService } from 'src/app/services/Post/post.service';
@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

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

  ngOnInit(): void {
    this.getPosts();
  }





  resp:string='';
  delete(id:number):void{
    this.PostService.deletePost(id).subscribe(resp=>{
      this.resp='Post je uspešno obrisan'
      setTimeout(function() {
        location.reload();
      }, 2100);
     }
      );
  }


  changeStatus(id:number):void{
    this.PostService.changeStatus(id).subscribe(resp=>{
      this.resp='Post je uspešno deaktiviran'
      setTimeout(function() {
        location.reload();
      }, 1800);
     }
      );
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getPosts();
 }
}
