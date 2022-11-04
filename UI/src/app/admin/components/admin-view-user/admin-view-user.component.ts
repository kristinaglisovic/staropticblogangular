import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUpdateUserRequest } from 'src/app/interfaces/User/IUpdateUserRequest';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService) { }
  errorMessage:any;
  user:any;
  isReady: boolean=false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
      const id=params.get('id');
        if(id){
        this.userService.getOneUserById(id).subscribe(response=>{
          console.log(response)
          this.user=response;
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
    const updateUserRequest:IUpdateUserRequest={
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      username:this.user.username,
      email:this.user.email,
    }

    this.userService.updateUser(this.user?.id,updateUserRequest).subscribe
    (resp=>{
      this.resp='Korisnik je uspešno ažuriran'
      setTimeout(function() {
        location.reload();
      }, 2100);
    })
  }

}
