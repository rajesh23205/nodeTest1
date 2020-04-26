import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { SubjectSharedService } from '../shared/services/subject.service';
import { DataService } from '../shared/services/data.service';
import { ValidatePincode } from '../shared/validator/pincode.validator';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  showDanger = false;
  showsuccess = false;
  routerLink = 'registerHotel';
  pinCodeDataFound = false;
  showDataLoader = false;
  areaList = [];
  pincodeResponse;

  constructor(
    private formBuilder: FormBuilder,
    private http: ApiService,
    private subjectShareService: SubjectSharedService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.userId = this.dataService.getUserData()[0]._id;
    this.createFormController();
    const loginData = this.dataService.getUserData();
    if (!loginData) {
      this.router.navigate(['/home']);
    }
  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

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
       area: ['', Validators.required]
     }, {
      validator: ValidatePincode('postCode')
    });
   }

   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.controls['area'].valid) {
      this.setOtherData();
    }
    const userId = this.dataService.getUserData()[0]._id;
    if (userId) {
      this.registerForm.get('userId').setValue(userId);
    } else {
      this.subjectShareService.showLoginModal(true);
      return;
    }

    if (this.registerForm.invalid) {
        return;
    }
    this.subjectShareService.showLoader(true);
    this.http.post(this.routerLink, this.registerForm.value).subscribe(
      suc => {
          this.handleSuccess(suc);
          this.subjectShareService.showLoader(false);
      },
      err => {
        const data =  { res : 'error'};
        this.handleSuccess(data);
      }
    );

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  getAddressData (event) {
    if (this.registerForm.controls['postCode'].valid) {
      const pincode = this.registerForm.controls['postCode'].value;
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

  setAddress (pinCodeData) {
    this.pincodeResponse = pinCodeData;
    this.areaList = pinCodeData[0].PostOffice.map(function(data) {
      return data.Name;
    });
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

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  handleSuccess(successData) {
    // $('#signUpModal').modal('hide');
    this.onReset();
    if (successData.res === 'success') {
      // this.showsuccess = true;
      const popupData = {
        'success': true,
        'header' : 'Congratulaions!',
        'body' : 'Registered successfully.'
      };
      this.subjectShareService.errorSuccessPopup(popupData);
    } else {
      // this.showDanger = true;
      this.subjectShareService.showLoader(false);
        const popupData = {
          'success': false,
          'header' : 'OOPS!',
          'body' : 'Getting some error, Please try again after few minutes.'
        };
        this.subjectShareService.errorSuccessPopup(popupData);
    }
    // setTimeout(() => {
    //   this.showDanger = false;
    //   this.showsuccess = false;
    // }, 5000);
  }


  // hideSuccessAlert() {
  //   this.showsuccess = false;
  // }

  // hideDangerAlert() {
  //   this.showDanger = false;
  // }

}
