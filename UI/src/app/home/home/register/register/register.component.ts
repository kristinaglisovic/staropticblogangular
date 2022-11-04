import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService:UserService,private router:Router) { }



  navigate(){
    this.router.navigate(['home'])
    .then(() => {
      window.location.reload();
    });
  }


  checkUser(){
    if(JSON.parse(localStorage.getItem('user'))){
       this.navigate()
    }
  }

  addUser:FormGroup;




  ngOnInit(): void {
    this.checkUser()
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
    formData.append('RoleId', 2);
    formData.append('Image', this.addUser.get('fileSource')?.value);

   
    this.userService.addUser(formData).subscribe
    (resp=>{
      this.resp='Uspešno ste se registrovali'
      setTimeout(function() {
        location.reload();
      }, 1500);
    },
    (error:HttpErrorResponse)=>{
      console.log(error)
      if(error.status==500){
        this.resp2="Dozvoljene ekstenzije su: .jpg, .png, .jpeg, .gif,.JPG, .PNG,.JPEG, .GIF";
      }
    });
    
  }

}
