import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-all-request-detail',
  templateUrl: './all-request-detail.component.html',
  styleUrls: ['./all-request-detail.component.scss']
})
export class AllRequestDetailComponent implements OnInit {

  userId: String;
  routerLink: String = 'allRequest';
  requestList = [] ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params['params']['userId'];
      this.getData();
    });
  }

  getData() {
    const requestData = { 'userId' : this.userId };
    this.http.post(this.routerLink, requestData).subscribe(
      suc => {
          this.handleSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
   }

   handleSuccess(data) {
     this.requestList = data.data;
   }

}
