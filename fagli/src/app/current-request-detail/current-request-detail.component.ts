import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-current-request-detail',
  templateUrl: './current-request-detail.component.html',
  styleUrls: ['./current-request-detail.component.scss']
})
export class CurrentRequestDetailComponent implements OnInit {

  requestId: String;
  routerLink: String = 'currentRequest';
  currentData: any;
  requestData;

  constructor(
    private http: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.requestId = params['params']['requestId'];
      this.getData();
    });
  }

  getData() {
    const requestData = { 'requestId' : this.requestId };
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
     this.requestData = data.data[0];
   }

}
