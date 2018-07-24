import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData:any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(){
    console.log("Profile Page");
    this.http.get('/getTeam').subscribe(data => {
      this.userData = data[0];
      console.log("User:", this.userData);
    });
    console.log("End on Init");
  }
}
