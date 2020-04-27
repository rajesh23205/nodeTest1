import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectSharedService } from '../../services/subject.service';
import { ApiService } from '../../services/api.service';
declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitText: String = 'Submit';
  submitted = false;
  showLoader: Boolean = false;
  routerLink: String = 'forgotPassword';
  showSuccessMsg: Boolean = false;
  showErrorMsg: Boolean = false;
  serverErrorMsg: Boolean = false;
  mailId: String;

  constructor(
    private subjectShareService: SubjectSharedService,
    private formBuilder: FormBuilder,
    private http: ApiService
  ) {
    this.subjectShareService.showForgotPassword$.subscribe((show: Boolean) => {
      this.showSuccessMsg = false;
      this.showErrorMsg = false;
      this.serverErrorMsg = false;
      $('#forgotPasswordModal').modal('show');
    });
  }

  ngOnInit() {
    this.createFormController();
   }

  get fp() { return this.forgotPasswordForm.controls; }

  createFormController() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
  }
  this.submitText = 'Loading...';
  this.showLoader = true;
  this.http.post(this.routerLink, this.forgotPasswordForm.value).subscribe(
    suc => {
      this.showLoader = false;
      this.submitText = 'Submit';
      this.handleSuccess(suc);
    },
    err => {
      this.showLoader = false;
      this.submitText = 'Submit';
      this.serverErrorMsg = true;
      console.log(err );
      const popupData = {
        'success': false,
        'header' : 'OOPS!',
        'body' : 'Getting server error. Please retry.'
      };
      this.subjectShareService.errorSuccessPopup(popupData);
    }
  );
   }

   handleSuccess(successData) {
    if (!successData.isExist) {
      const popupData = {
        'success': false,
        'header' : 'OOPS!',
        'body' : 'Email Id not found.'
      };
      this.subjectShareService.errorSuccessPopup(popupData);
      this.showErrorMsg = true;
    } else {
      this.showSuccessMsg = true;
      if (successData.processCode === 1) {
        this.mailId = this.forgotPasswordForm.value.email;
        this.subjectShareService.showLoader(false);
        const popupData = {
          'success': true,
          'header' : 'Congratulaions!',
          'body' : 'Your password has been sent on your mail id ' + this.forgotPasswordForm.value.email + '.'
        };
        this.subjectShareService.errorSuccessPopup(popupData);

        // this.dataService.setUserData(successData.data);
        // this.subjectShareService.showUserNameInHeader(successData.data);
        // this.
        // toaster code and save display data
      } else {
        // this.errorString = successData.info;
      }
    }
  }

}
