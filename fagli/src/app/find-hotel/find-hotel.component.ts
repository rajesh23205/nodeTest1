import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { CommonUtils } from '../shared/services/commonUtils.service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-find-hotel',
  templateUrl: './find-hotel.component.html',
  styleUrls: ['./find-hotel.component.scss']
})
export class FindHotelComponent implements OnInit {

  routerLink: String = 'hotelList';
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
  loading: Boolean = false;

  constructor(
    private http: ApiService,
    private activatedRoute: ActivatedRoute,
    private commUtils: CommonUtils,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(params => {
    //   if( params['params']['userId'] ) {
    //     this.userId = params['params']['userId'];
    //   }
    // });
    const loginData = this.dataService.getUserData();
    if (loginData) {
      this.userId = loginData[0]._id;
    } else {
      this.userId = '';
    }
    this.filterData = {};
    this.getData();
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
    if (data.data.hotelList.length < this.limit) {
      this.noMoreData = true;
    }
    this.data = [...this.data, ...data.data.hotelList];
    if (this.filterData['state'] && this.filterData['state'] !== this.currentState) {
      // this.cityList = data.map(function(obj) {
      //   return obj.city;
      // });
      // this.cityList = this.commUtils.removeDublicate(this.cityList);
      this.cityList = data.data.cityList;
      this.areaList = [];
      this.currentState = this.filterData['state'];
    }

    if (this.filterData['city'] && this.filterData['city'] !== this.currentCity) {
      // this.areaList = data.map(function(obj) {
      //   return obj.area;
      // });
      this.areaList = data.data.areaList;
      this.currentCity = this.filterData['city'];
    }

    if (!this.filterData['state']) {
      this.cityList = [];
    }
  }

  applyFilter(data) {
    this.data = [];
    this.limit = 4;
    this.count = 0;
    this.noMoreData = false;
    this.loading = false;
    this.filterData = data;
    this.getData();
  }

}
