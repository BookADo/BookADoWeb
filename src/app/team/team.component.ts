import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  members: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/getTeam').subscribe(data => {
    this.members = data;
  });
  }

}
