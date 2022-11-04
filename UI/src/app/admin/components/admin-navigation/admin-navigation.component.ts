import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {

  constructor(
    private router:Router,
    public auth: AuthService
    ) { }

  ngOnInit(): void {

  }
  navigate(){
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
 }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl("/").then(() => this.auth.user = null);
    
  }
}
