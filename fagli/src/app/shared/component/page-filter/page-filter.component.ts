import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConstant } from '../../constant/AppConstant';

@Component({
  selector: 'app-page-filter',
  templateUrl: './page-filter.component.html',
  styleUrls: ['./page-filter.component.scss']
})
export class PageFilterComponent implements OnInit {

  public hotelName: any = '';
  public location: any = 'Location';
  public maxRent: any = 'Max Rent';
  public state: any = 'Select State';
  public city: any = 'Select City';
  public area: any = 'Select Area';
  public stateList = AppConstant.State;
  private obj = {};
  @Input() cityList = [];
  @Input() areaList = [];
  @Input() data: any = [];
  @Input() imageUrl;
  @Output() applyFilter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getData(event) {
    if (event.target.id === 'stateName') {
      this.area = 'Select Area';
      this.city = 'Select City';
      this.maxRent = 'Max Rent';
      this.cityList = [];
      this.areaList = [];
    }
    if (event.target.id === 'cityName') {
      this.area = 'Select Area';
      this.areaList = [];
    }
    this.obj = {
      'hotelName': this.hotelName,
      'state': (this.state === 'Select State') ? '' : this.state,
      'city': (this.city === 'Select City') ? '' : this.city,
      'area': (this.area === 'Select Area') ? '' : this.area,
      'minRoomCharge': (this.maxRent === 'Max Rent') ? '' : this.maxRent
    };
    this.applyFilter.next(this.obj);
  }

  onSearchClick() {
    const obj = {};
    let shouldCall = false;
    if (this.hotelName) {
      obj['hotelName'] = this.hotelName;
      shouldCall = true;
    }

    if (this.location !== 'Location') {
      obj['location'] = this.location;
      shouldCall = true;
    }

    if (this.maxRent !== 'Max Rent') {
      obj['maxRent'] = this.maxRent;
      shouldCall = true;
    }

    if (shouldCall) {
      this.applyFilter.next(obj);
    }


  }

}
