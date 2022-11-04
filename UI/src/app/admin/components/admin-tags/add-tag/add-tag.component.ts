import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddTagRequest } from 'src/app/interfaces/Tag/IAddTagRequest';
import { TagService } from 'src/app/services/Tag/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  constructor(private tagService:TagService) { }
  category:any;

  addTag:FormGroup;

  ngOnInit(): void {
    this.addTag=new FormGroup({
      name:new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    });
  }

  get f(){return this.addTag.controls;}
  resp:string='';
  onSubmit():void{
    
    const addtagRequest:IAddTagRequest={
      name:this.addTag.value.name,
    }

    this.tagService.addTag(addtagRequest).subscribe
    (resp=>{
      this.resp='Tag je uspešno kreiran'
      setTimeout(function() {
        location.reload();
      }, 1500);
    });
    
  }
}
