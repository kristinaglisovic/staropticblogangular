import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/Category/category.service';
import { CommentService } from 'src/app/services/Comment/comment.service';
import { ImagesService } from 'src/app/services/Images/images.service';
import { PostService } from 'src/app/services/Post/post.service';
import { TagService } from 'src/app/services/Tag/tag.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {

  constructor(private us:UserService,private comS:CommentService,private ts:TagService,private categS:CategoryService,private ps:PostService,private is:ImagesService,private router:Router) { }

  images:any;
  p: number = 1;
  total: number = 0;

  navigate(){
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }


  getImages(){
    this.is.getAllImages(this.p)
      .subscribe((response:any)=>{
        console.log(response)
        this.images=response.data;
        this.total = response.totalCount;
      }
      );
  }




  user:any=JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    
   this.getImages()
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getImages();
  }

}
