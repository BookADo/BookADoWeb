import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  ngOnInit(){
    console.log("Profile Page");
    this.auth.profile().subscribe (user => {
      this.details = user;
    },(err) => {
      console.error(err);
    });
  }
}
