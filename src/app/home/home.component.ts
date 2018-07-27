import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  details : UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {
    document.body.className = 'home-container-background';
  }
  ngOnDestroy() {
    document.body.className = '';
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  login() {
    console.log("Called login");
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  checkLoginStatus(){
    if (!this.auth.isLoggedIn()) {
        this.auth.profile().subscribe (user => {
          this.details = user;
        },(err) => {
          console.error(err);
      });
    }
  }
}
