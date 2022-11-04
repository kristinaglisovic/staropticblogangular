import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUpdateTagRequest } from 'src/app/interfaces/Tag/IUpdateTagRequest';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-admin-view-tag',
  templateUrl: './admin-view-tag.component.html',
  styleUrls: ['./admin-view-tag.component.css']
})
export class AdminViewTagComponent implements OnInit {

  constructor(private route:ActivatedRoute,private tagService:TagService) { }
  errorMessage:any;
  tag:any;
  isReady: boolean=false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
      const id=params.get('id');
        if(id){
        this.tagService.getOneTagById(id).subscribe(response=>{
          console.log(response)
          this.tag=response;
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
    const updateTagRequest:IUpdateTagRequest={
      name:this.tag.name,
      isActive:this.tag.isActive,
      updatedAt:this.tag.updatedAt
    }

    this.tagService.updateTag(this.tag?.id,updateTagRequest).subscribe
    (resp=>{
      this.resp='Tag je uspešno ažuriran'
      setTimeout(function() {
        location.reload();
      }, 2100);
    })
  }

}
