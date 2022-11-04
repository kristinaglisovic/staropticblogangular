import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Post/IPost';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-recent-p',
  templateUrl: './recent-p.component.html',
  styleUrls: ['./recent-p.component.css']
})
export class RecentPComponent implements OnInit {

  constructor(private PostService:PostService) { }


  posts:Post[]=[];

 

  getPosts(){
    this.PostService.getAllFDashPosts()
      .subscribe((response:any)=>{
        console.log(response)
        this.posts=response.data;
        this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      );
  }

  onlyActive(items: any[]): any[] {
    return items.filter(p => p.isActive==true);
  }
  
  ngOnInit(): void {
    this.getPosts();
  }

 
}
