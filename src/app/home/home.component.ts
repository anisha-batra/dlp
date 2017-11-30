import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  member = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }

  registerMember() {
    this.http.post('api/member', this.member).subscribe(data => {
      this.router.navigateByUrl('/members');
    });
  }
}
