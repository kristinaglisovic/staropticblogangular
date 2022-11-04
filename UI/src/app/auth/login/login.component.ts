import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/User/user.service';
import { User } from 'src/app/interfaces/User/IUser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth:AuthService,private router:Router,private us:UserService) { }
  loginForm: FormGroup;
  user:User;

  navigate(){
    this.router.navigate(['home'])
    // .then(() => {
    //   window.location.reload();
    // });
  }


  checkUser(){
    if(JSON.parse(localStorage.getItem('user'))){
       this.navigate()
    }
  }
 
  
  ngOnInit(): void {
    this.checkUser()
    this.loginForm=new FormGroup({
      email:new FormControl("", [Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
   });
  }

  get f(){return this.loginForm.controls;}
  resp:string='';


  error:string=''
  login(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(result=>{
       // console.log(this.loginForm.value)
       localStorage.setItem('email',this.loginForm.get('email').value.split("@")[0])
       
       const helper = new JwtHelperService();
       
       const decodedToken = helper.decodeToken(result.token);
       
       const userId=decodedToken.UserId;
       
       console.log(userId);
        this.us.getOneUserById(userId).subscribe(result=>{
          localStorage.setItem('user',JSON.stringify(result))
          this.auth.user = result;
        },
        )
       
        this.navigate()
      },
      (error)=>{
        console.log(error)
        this.error=error;
      })
    }
  }

}
