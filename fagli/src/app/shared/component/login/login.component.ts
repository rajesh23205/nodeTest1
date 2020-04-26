import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SubjectSharedService } from '../../services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,  AfterViewInit  {

  loginForm: FormGroup;
  submitted = false;
  routerLink = 'login';
  errorString: String = '';
  successAlert: Boolean = false;
  dangerAlert: Boolean = false;
  submitText: String = 'Submit';
  showLoader: Boolean = false;

  constructor(
    private subjectShareService: SubjectSharedService,
    private formBuilder: FormBuilder,
    private http: ApiService,
    private dataService: DataService
  ) {
    this.subjectShareService.showLoginModal$.subscribe((show: Boolean) => {
      $('#loginModal').modal('show');
    });
  }

  ngOnInit() {
    this.createFormController();
  }

  ngAfterViewInit() {
    // this.checkLogin();
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  createFormController() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignUpClick() {
    $('#loginModal').modal('hide');
    this.subjectShareService.showSignupModal(true);
  }

  onSubmit() {
    this.submitted = true;
    this.errorString = '';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.submitText = 'Loading...';
    this.showLoader = true;
    this.http.post(this.routerLink, this.loginForm.value).subscribe(
      suc => {
        this.showLoader = false;
        this.submitText = 'Submit';
        this.handleSuccess(suc);
      },
      err => {
        this.showLoader = false;
        this.submitText = 'Submit';
        console.log(err );
      }
    );

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }

  handleSuccess(successData) {
    if (successData.err === 1) {
      $('#loginModal').modal('hide');
      // this.dangerAlert = true;
      const popupData = {
        'success': false,
        'header' : 'OOPS!',
        'body' : 'Please retry.'
      };
      this.subjectShareService.errorSuccessPopup(popupData);
      // toster code
    } else {
      if (successData.processCode === 1) {
        $('#loginModal').modal('hide');
        // this.successAlert = true;
        this.subjectShareService.showLoader(false);
        const popupData = {
          'success': true,
          'header' : 'Congratulaions!',
          'body' : 'Login Successfully.'
        };
        this.subjectShareService.errorSuccessPopup(popupData);

        this.dataService.setUserData(successData.data);
        this.subjectShareService.showUserNameInHeader(successData.data);
        // this.
        // toaster code and save display data
      } else {
        this.errorString = successData.info;
      }
    }
    // setTimeout(() => {
    //   this.successAlert = false;
    //   this.dangerAlert = false;
    // }, 5000);
  }

  hideSuccessAlert() {
    this.successAlert = false;
  }

  hideDangerAlert() {
    this.dangerAlert = false;
  }

}
