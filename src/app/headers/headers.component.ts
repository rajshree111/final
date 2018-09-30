import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  isLoggedIn: Boolean ;


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  
  this.authService.currentMessage.subscribe(value => {
      this.isLoggedIn = value;
      console.log('***************************' + this.isLoggedIn);
    });
  }

  logout(){
  this.authService.signOut();
  this.router.navigate(['home']);
  }
}
