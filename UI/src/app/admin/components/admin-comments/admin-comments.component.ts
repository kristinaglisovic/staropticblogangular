import { Component, OnInit, ViewChild } from '@angular/core';
import { IComment } from 'src/app/interfaces/Comment/IComment';
import { IUpdateCommentRequest } from 'src/app/interfaces/Comment/IUpdateCommentRequest';
import { CommentService } from 'src/app/services/Comment/comment.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

  constructor(private CommService:CommentService) { }


  comments:IComment[]=[];




  p: number = 1;
  total: number = 0;

  getComments(){
    this.CommService.getAllComments(this.p)
    .subscribe((response:any)=>{
      console.log(response)
      this.comments=response.data;
      this.total = response.totalCount;
      }
      );
  }
  
 

  ngOnInit(): void {
    this.getComments();
  }



  resp:string='';
  delete(id:number):void{
    this.CommService.deleteComment(id).subscribe(resp=>{
      this.resp='Komentar je uspešno obrisan'
      setTimeout(function() {
        location.reload();
      },1800);
     }
      );
  }
  
  changeStatus(id:number):void{
    this.CommService.changeStatus(id).subscribe(resp=>{
      this.resp='Status je uspešno promenjen'
      setTimeout(function() {
        location.reload();
      }, 1800);
     }
      );
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getComments();
 }

}
