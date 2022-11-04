import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/Tag/ITag';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  constructor(private tagsService:TagService) { }

  tags:Tag[]=[];


  p: number = 1;
  total: number = 0;

  getTags(){
    this.tagsService.getAllTags(this.p)
      .subscribe((response:any)=>{
        console.log(response)
        this.tags=response.data;
        this.total = response.totalCount;
      }
      );
  }

  ngOnInit(): void {
    this.getTags();
  }


changeStatus(id:number):void{
  this.tagsService.changeStatus(id).subscribe(resp=>{
    this.resp='Tag je uspešno deaktiviran'
    setTimeout(function() {
      location.reload();
    }, 1800);
   }
    );
}


  resp:string='';
  delete(id:number):void{
    this.tagsService.deleteTag(id).subscribe(resp=>{
      this.resp='Tag je uspešno obrisan'
      setTimeout(function() {
        location.reload();
      }, 2100);
     }
      );
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getTags();
 }
}
