import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ValidatePincode } from '../shared/validator/pincode.validator';
import { DataService } from '../shared/services/data.service';
import { SubjectSharedService } from '../shared/services/subject.service';
declare var $: any;

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotelId: String;
  userId: String;
  routerLink: String = 'hotelDetails';
  routerLink2: String = 'updateHotel';
  routerLink3: String = 'intreatedRoomates';
  routerLink4: String = 'deleteHotel';
  routerLink5: String = 'registerHotelSchema';
  data = [];
  filterData = {};
  hotelName: String = '';
  _id: String = '';
  email: String = '';
  mobileNumber: String = '';
  house: String = '';
  street: String = '';
  address: String = '';
  city: String = '';
  state: String = '';
  postCode: String = '';
  country: String = '';
  minRoomCharge: String = '';
  area: String = '';
  registerForm: FormGroup;
  submitted = false;
  pinCodeDataFound = true;
  showDataLoader = false;
  areaList = [];
  pincodeResponse;
  currentHotelName: String = '';
  loggedInUserId: String = '';
  showsuccess: Boolean = false;
  showDanger: Boolean = false;
  isFirst: Boolean = true;
  intreastedCount: Number = 0;
  isRemoved: Boolean = false;
  successMessage: String = '';
  deleteSuccessMsg: String = 'Deleted successfully.';
  updatedSuccessFully: String = 'Updated Successfully';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectShareService: SubjectSharedService,
    private http: ApiService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
   }

  ngOnInit() {
    const loginData = this.dataService.getUserData();
    if (!loginData) {
      // this.router.navigate(['/home']);
    }
    this.activatedRoute.paramMap.subscribe(params => {
      this.hotelId = params['params']['hotelId'];
      this.userId = params['params']['userId'];
    });
    this.createFormController();
    this.validateHotelOwner();
  }

  validateHotelOwner() {
    const data = { 'userId': this.userId, 'hotelId': this.hotelId };
    this.http.post(this.routerLink5, data).subscribe(
      suc => {
        if (suc['data'] && suc['data'].length > 0) {
          this.callHotelData();
          this.getIntreastedCount();
        } else {
          this.router.navigate(['/errorPage']);
        }
      },
      err => {
        this.router.navigate(['/home']);
      }
    );
  }

  // validateUser() {
  //   const data = { 'userId': this.userId };
  //   this.http.post(this.routerLink2, data).subscribe(
  //     suc => {
  //       if (suc['data'] && suc['data'].length > 0) {
  //         this.getData();
  //       } else {
  //         this.router.navigate(['/errorPage']);
  //       }
  //     },
  //     err => {
  //       this.router.navigate(['/home']);
  //     }
  //   );
  // }

  getIntreastedCount() {
    const data = {
      'hotelId' : this.hotelId
    };

    this.http.post(this.routerLink3, data).subscribe(
      suc => {
          this.setIntreastCount(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  setIntreastCount(users) {
    this.intreastedCount = users.data.length;
  }

  callHotelData() {
    this.filterData['hotelId'] = this.hotelId;
    this.filterData['userId'] = this.userId;
    this.getData();
    // this.createFormController();
    this.bindModalEvent();
    this.loggedInUserId = this.dataService.getUserData()[0]._id;
  }

  get f() { return this.registerForm.controls; }

  bindModalEvent() {
    const that = this;
    $('#hotelDetailsModal').on('show.bs.modal', function(e) {
      that.registerForm.get('hotelName').setValue(that.hotelName);
      that.registerForm.get('minRoomCharge').setValue(that.minRoomCharge);
      that.registerForm.get('email').setValue(that.email);
      that.registerForm.get('mobileNumber').setValue(that.mobileNumber);
      // that.registerForm.get('postCode').setValue(that.postCode);
      that.registerForm.get('house').setValue(that.house);
      that.registerForm.get('street').setValue(that.street);
      that.registerForm.get('address').setValue(that.address);
      that.registerForm.get('userId').setValue(that.userId);
      that.registerForm.get('hotelId').setValue(that.hotelId);
      // that.getAddressData(false);
    });
  }

  getAddressData (event) {
    let pincode;
    if (this.registerForm.controls['postCode'].valid) {
      pincode = this.registerForm.controls['postCode'].value;
    }
    // else if (this.postCode && this.isFirst) {
    //   pincode = this.postCode;
    //   this.isFirst = false;
    // }
    if (pincode) {
      this.pinCodeDataFound = false;
      this.showDataLoader = true;
      this.http.getPincode(pincode).subscribe(
        success => {
          this.setAddress(success);
          this.pinCodeDataFound = true;
          this.showDataLoader = false;
        },
        err => {
          // alert('ERROE DATA!! :-)\n\n' + JSON.stringify(err, null, 4));
          alert('SERVER ERROE!! :-)\n\n' + 'Please select Pincode Again');
          this.registerForm.get('state').setValue('');
          this.showDataLoader = false;
          this.pinCodeDataFound = false;
        }
      );
    } else {
      this.showDataLoader = false;
      this.pinCodeDataFound = false;
    }
  }

  createFormController() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      hotelName: ['', Validators.required],
      house: ['', Validators.required],
      street: [''],
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
      minRoomCharge: ['', Validators.required],
      userId: ['', Validators.required],
      area: ['', Validators.required],
      hotelId: ['', Validators.required]
    }, {
      validator: ValidatePincode('postCode')
    });
  }

  getData() {
    this.http.post(this.routerLink, this.filterData).subscribe(
      suc => {
          this.handleSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.controls['area'].valid) {
      this.setOtherData();
    }

    if (this.registerForm.invalid) {
        return;
    }
    this.subjectShareService.showLoader(true);
    this.http.post(this.routerLink2, this.registerForm.value).subscribe(
      suc => {
          this.handleUpdateSuccess(suc);
          this.successMessage = this.updatedSuccessFully;
          this.subjectShareService.showLoader(false);
      },
      err => {
          console.log(err );
      }
    );

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  setOtherData() {
    const area = this.registerForm.controls['area'].value;
    const currentArea = this.pincodeResponse[0].PostOffice.filter(function(data) {
      if (data.Name === area) {
          return data;
      }
    });
    this.registerForm.get('state').setValue(currentArea[0].State);
    this.registerForm.get('city').setValue(currentArea[0].District);
    this.registerForm.get('country').setValue(currentArea[0].Country);
  }

  setAddress (pinCodeData) {
    this.pincodeResponse = pinCodeData;
    this.registerForm.controls['area'].reset();
    this.areaList = pinCodeData[0].PostOffice.map(function(data) {
      return data.Name;
    });
  }

  handleSuccess (data) {
    this.data = data;
    this._id = this.data[0]._id;
    this.hotelName = this.data[0].hotelName;
    this.email = this.data[0].email;
    this.mobileNumber = this.data[0].mobileNumber;
    this.minRoomCharge = this.data[0].minRoomCharge;
    this.house = this.data[0].house;
    this.street = this.data[0].street;
    this.city = this.data[0].city;
    this.state = this.data[0].state;
    this.postCode = this.data[0].postCode;
    this.country = this.data[0].country;
    this.area = this.data[0].area;
    this.address = this.data[0].address;
  }

  handleUpdateSuccess(data) {
      if (data.res === 'success') {
        $('#hotelDetailsModal').modal('hide');
        this.showsuccess = true;
        this.callHotelData();
      } else {
        this.showDanger = true;
      }
      setTimeout(() => {
        this.showDanger = false;
        this.showsuccess = false;
      }, 5000);
  }

  hideSuccessAlert() {
    this.showsuccess = false;
  }

  hideDangerAlert() {
    this.showDanger = false;
  }

  deleteHotel() {
    const data = {
      'hotelId' : this.hotelId
    };
    this.subjectShareService.showLoader(true);
    this.http.post(this.routerLink4, data).subscribe(
      suc => {
          this.handleDeleteSuccess(suc);
      },
      err => {
        const msg = { res : 'error'};
        this.handleDeleteSuccess(msg);
      }
    );
  }

  handleDeleteSuccess(successData) {
    if (successData.res === 'success') {
      this.successMessage = this.deleteSuccessMsg;
      this.subjectShareService.showLoader(false);
      this.isRemoved = true;
      this.showsuccess = true;
    } else {
      this.showDanger = true;
    }
    setTimeout(() => {
      this.showDanger = false;
      this.showsuccess = false;
    }, 5000);
    // setTimeout(function() {
    //   this.router.navigate(['/findHotel', this.userId]);
    // });
    // setTimeout(() =>
    //   this.router.navigate(['/findHotel', this.userId]
    // ), 500);
  }

}
