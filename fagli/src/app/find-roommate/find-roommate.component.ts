import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-find-roommate',
  templateUrl: './find-roommate.component.html',
  styleUrls: ['./find-roommate.component.scss']
})
export class FindRoommateComponent implements OnInit {

  hotelId: String;
  userId: String;
  findRoommateForm: FormGroup;
  submitted: Boolean = false;
  value;
  dateValue;
  minDateValue;
  maxDateValue;
  minimumDate = new Date();
  otherOptionValue;
  visitPurpose;
  visitDetails;
  finalDate;
  purpose;
  finalData;
  routerLink: String = 'findRoommate';
  year;
  month;
  date;
  loggedInUserData;
  loggedUserId;
  LoggedUserName;
  showsuccess = false;
  showDanger = false;
  // othersSelected: Boolean = false;
  // othersEmpty: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: ApiService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.hotelId = params['params']['hotelId'];
      this.userId = params['params']['userId'];
    });
    this.createFormController();
    this.loggedInUserData = this.dataService.getUserData();
    this.LoggedUserName = this.loggedInUserData[0].firstName;
    this.loggedUserId = this.loggedInUserData[0]._id;
  }

  // get fr() { return this.findRoommateForm.controls; }

  createFormController() {
    //  this.findRoommateForm = this.formBuilder.group({
    //    dateRange: ['', [Validators.required]],
    //    visitPurpose: ['', [Validators.required]],
    //    details: ['', [Validators.required]],
    //    othersOptions: ['', [Validators.required]],
    //  });
   }

   onSubmit() {
     this.submitted = true;
     if (this.dateValue && this.visitPurpose && this.visitDetails) {
       if (this.visitPurpose === 'Other') {
        if (this.otherOptionValue) {
          this.updateDateValue();
          this.createDate();
          this.sendData();
        }
       } else {
        this.updateDateValue();
        this.createDate();
        this.sendData();
       }
     }
   }

   sendData() {
    this.http.post(this.routerLink, this.finalData).subscribe(
      suc => {
          this.handleSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
   }

   resetForm() {
    this.submitted = false;
    this.dateValue = '';
    this.visitPurpose = '';
    this.otherOptionValue = '';
    this.visitDetails = '';
   }

   handleSuccess (successData) {
    this.resetForm();
    if (successData.res === 'success') {
      this.showsuccess = true;
    } else {
      this.showDanger = true;
    }
    setTimeout(() => {
      this.showDanger = false;
      this.showsuccess = false;
    }, 500);
   }

   hideSuccessAlert() {
    this.showsuccess = false;
  }

  hideDangerAlert() {
    this.showDanger = false;
  }

   createDate() {
    this.purpose = this.visitPurpose;
    if (this.visitPurpose === 'Other') {
      this.purpose = this.otherOptionValue;
     }
     this.monthNumber();
     this.finalData = {
      'visitPurpose': this.purpose,
      'dateRange' : this.finalDate,
      'details' : this.visitDetails,
      'hotelId' : this.hotelId,
      'userId' : this.userId,
      'date' : this.date,
      'month' : this.month,
      'year' : this.year,
      'finderUserID' : this.loggedUserId,
      'finderUserName' : this.LoggedUserName,
      'intreastedUsers' : ''
     };
   }

   updateDateValue() {
    // console.log(this.dateValue);
    let date;
    if (this.dateValue[0]) {
      date = this.dateValue[0].toString().slice(0, 15);
    }
    if (this.dateValue[1]) {
      date = date + ' - ' + this.dateValue[1].toString().slice(0, 15);
    }
    this.finalDate = date;
   }

   purposeChangeHandler(event) {
    this.visitPurpose = event.target.value;
   }

   monthNumber() {
     const month = this.finalDate.split(' ')[1];
     this.date = Number(this.finalDate.split(' ')[2]);
     this.year = Number(this.finalDate.split(' ')[3]);
     switch (month) {
      case 'Jan':
        this.month = 1;
        break;
      case 'Feb':
          this.month = 2;
        break;
      case 'Mar':
          this.month = 3;
        break;
      case 'Apr':
          this.month = 4;
        break;
      case 'May':
          this.month = 5;
        break;
      case 'Jun':
          this.month = 6;
        break;
      case 'Jul':
          this.month = 7;
        break;
      case 'Aug':
          this.month = 8;
        break;
      case 'Sep':
          this.month = 9;
        break;
      case 'Oct':
          this.month = 10;
        break;
      case 'Nov':
          this.month = 11;
        break;
      case 'Dec':
          this.month = 12;
        break;
      default:
        // code block
    }
   }

}
