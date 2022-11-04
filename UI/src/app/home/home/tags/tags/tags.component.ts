import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/Tag/ITag';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(private ts:TagService) { }

  tags:Tag[]=[];

 
  onlyActive(items: any[]): any[] {
    return items.filter(p => p.isActive==true);
  }

  getTags(){
    this.ts.getPostTags()
      .subscribe((response:any)=>{
        console.log(response)
        this.tags=response.data;
      }
      );
  } 
  ngOnInit(): void {
    this.getTags()
  }

}
