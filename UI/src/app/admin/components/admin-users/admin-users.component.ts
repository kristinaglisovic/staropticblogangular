import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User/IUser';

import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private UserService:UserService) { }


  users:User[]=[];

  p: number = 1;
  total: number = 0;

  getUsers(){
    this.UserService.getAllUsers(this.p)
      .subscribe((response:any)=>{
        console.log(response)
        this.users=response.data;
        this.total = response.totalCount;
      }
      );
  }
  
  


  ngOnInit(): void {
    this.getUsers();
  }





  resp:string='';
  delete(id:number):void{
    this.UserService.deleteUser(id).subscribe(resp=>{
      this.resp='Korisnik je uspešno obrisan'
      setTimeout(function() {
        location.reload();
      }, 2100);
     }
      );
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getUsers();
 }
}
