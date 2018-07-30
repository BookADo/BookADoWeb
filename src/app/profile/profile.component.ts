import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, UserDetails } from '../authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  details: UserDetails;
  menuOption: number;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  ngOnInit(){
    console.log("Profile Page");
    this.auth.profile().subscribe (user => {
      this.details = user;
    },(err) => {
      console.error(err);
    });
    console.log("End on Init");
    this.menuOption = 1;
    this.jqueryInit();
  }

  menuSelect = function(i){
    this.menuOption = i;
    this.jqueryInit();
  }

  jqueryInit = function() {
    $(".nav li").on("click", function(){
      $(".nav").find(".active").removeClass("active");
      $(this).addClass("active");
    });
  }

}
