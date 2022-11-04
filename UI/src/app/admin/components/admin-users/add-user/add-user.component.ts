import { Component, OnInit } from '@angular/core';

import { IAddUserRequest } from 'src/app/interfaces/User/IAddUserRequest';
import { UserService } from 'src/app/services/User/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService:UserService) { }

  addUser:FormGroup;

  ngOnInit(): void {
    this.addUser=new FormGroup({
      FirstName:new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
        Validators.pattern('^[A-ZŠĐČĆŽa-zšđčćž]+((\s)?((\'|\-|\.)?([A-ZŠĐČĆŽa-zšđčćž])+))*$')]),
      LastName:new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(40),Validators.pattern('^[A-ZŠĐČĆŽa-zšđčćž]+((\s)?((\'|\-|\.)?([A-ZŠĐČĆŽa-zšđčćž])+))*$')]),
      Username:new FormControl("", [Validators.required,Validators.pattern('^(?=.{4,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]),
      Email:new FormControl("", [Validators.required,Validators.email]),
      Password:new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
      Image:new FormControl(''),
      fileSource: new FormControl('')
    });
  }
  get f(){return this.addUser.controls;}


  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addUser.patchValue({
        fileSource: file
      });
    }
  } 

  resp:string='';
  resp2:string='';
  onSubmit():void{
    var formData: any = new FormData();
    
    formData.append('FirstName', this.addUser.get('FirstName').value);
    formData.append('LastName', this.addUser.get('LastName').value);
    formData.append('Username', this.addUser.get('Username').value);
    formData.append('Email', this.addUser.get('Email').value);
    formData.append('Password', this.addUser.get('Password').value);
    formData.append('RoleId', 1);
    formData.append('Image', this.addUser.get('fileSource')?.value);

   
    this.userService.addUser(formData).subscribe
    (resp=>{
      this.resp='Administrator je uspešno kreiran'
      setTimeout(function() {
        location.reload();
      }, 1500);
    },(error:HttpErrorResponse)=>{
      console.log(error)
      if(error.status==500){
        this.resp2="Dozvoljene ekstenzije su: .jpg, .png, .jpeg, .gif,.JPG, .PNG,.JPEG, .GIF";
      }
    });
    
  }
}
