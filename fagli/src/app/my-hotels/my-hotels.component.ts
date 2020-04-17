import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { CommonUtils } from '../shared/services/commonUtils.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.scss']
})
export class MyHotelsComponent implements OnInit {

  routerLink: String = 'myHotels';
  routerLink2: String = 'validateUser';
  data = [];
  areaList = [];
  cityList = [];
  filterData = {};
  currentState = '';
  currentCity = '';
  userId = '';
  limit = 4;
  count = 0;
  noMoreData: Boolean = false;
  loading: Boolean = true;

  constructor(
    private http: ApiService,
    private activatedRoute: ActivatedRoute,
    private commUtils: CommonUtils,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    const loginData = this.dataService.getUserData();
    if (!loginData) {
      this.router.navigate(['/home']);
    }
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params['params']['userId'];
    });
    this.filterData = {};
    this.validateUser();
  }

  validateUser() {
    const data = { 'userId': this.userId };
    this.http.post(this.routerLink2, data).subscribe(
      suc => {
        if (suc['data'] && suc['data'].length > 0) {
          this.getData();
        } else {
          this.router.navigate(['/errorPage']);
        }
      },
      err => {
        this.router.navigate(['/home']);
      }
    );
  }

  loadMoreData() {
    this.count++;
    this.getData();
  }

  getData() {
    this.filterData['userId'] = this.userId;
    this.filterData['limit'] = this.limit;
    this.filterData['count'] = this.count;
    this.loading = true;
    this.http.post(this.routerLink, this.filterData).subscribe(
      suc => {
          this.handleSuccess(suc);
          this.loading = false;
      },
      err => {
          console.log(err );
      }
    );
  }

  handleSuccess (data) {
    if (data.length < this.limit) {
      this.noMoreData = true;
    }
    this.data = [...this.data, ...data];
    if (this.filterData['state'] && this.filterData['state'] !== this.currentState) {
      this.cityList = data.map(function(obj) {
        return obj.city;
      });
      this.cityList = this.commUtils.removeDublicate(this.cityList);
      this.areaList = [];
      this.currentState = this.filterData['state'];
    }

    if (this.filterData['city'] && this.filterData['city'] !== this.currentCity) {
      this.areaList = data.map(function(obj) {
        return obj.area;
      });
      this.currentCity = this.filterData['city'];
    }

    if (!this.filterData['state']) {
      this.cityList = [];
    }
  }

  applyFilter(data) {
    this.filterData = data;
    this.getData();
  }


}
