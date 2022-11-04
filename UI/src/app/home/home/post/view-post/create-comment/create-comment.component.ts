import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddCommentRequest } from 'src/app/interfaces/Comment/IAddCommentRequest';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CommentService } from 'src/app/services/Comment/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  @Input() PostId:number

  addComment:FormGroup;

  constructor(
    private CommentService:CommentService,
    public auth: AuthService
    ) { }
  ngOnInit(): void {
    this.addComment=new FormGroup({
      Text:new FormControl("", [Validators.required,
                                Validators.minLength(1)]),
    });
  }
  get f(){return this.addComment.controls;}

  resp:string=''
  resp2:string=''
  onSubmit():void{
    //console.log(this.PostId,this.user.id,this.addComment.value.Text)
    const addCommentRequest:IAddCommentRequest={
      UserId:this.auth.user.id,
      Text:this.addComment.value.Text,
      PostId:this.PostId
    }

    this.CommentService.addComment(addCommentRequest).subscribe
    (resp=>{
      this.resp='Komentar je uspešno dodat'
      setTimeout(function() {
        location.reload();
      }, 1500);
    },
    (error:HttpErrorResponse)=>{
      if(error.status==409){
        this.resp2="Već ste ostavili isti komentar na ovoj objavi.";
      }
    });
    
  }

}
