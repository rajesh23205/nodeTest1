import { Component, OnInit } from '@angular/core';
import { SubjectSharedService } from '../../services/subject.service';
import { ApiService } from '../../services/api.service';
import { MustMatch } from '../../services/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  routerLink = 'signup';
  errorString: String = '';
  showLoader: Boolean = false;
  submitText: String = 'Submit';

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  constructor(
    private subjectShareService: SubjectSharedService,
    private formBuilder: FormBuilder,
    private http: ApiService
  ) {
    this.subjectShareService.showSignupModal$.subscribe((show: Boolean) => {
      $('#signUpModal').modal('show');
    });
   }

  ngOnInit() {
    this.createFormController();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  createFormController() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
      this.submitted = true;
      this.errorString = '';

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.submitText = 'Loading...';
      this.showLoader = true;
      this.http.post(this.routerLink, this.registerForm.value).subscribe(
        suc => {
          this.submitText = 'Submit';
          this.showLoader = false;
            this.handleSuccess(suc);
        },
        err => {
          this.submitText = 'Submit';
          this.showLoader = false;
            console.log(err );
        }
      );

      // display form values on success
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  handleSuccess(successData) {
    // $('#signUpModal').modal('hide');
    // this.onReset();
    if (successData.err !== 0) {
      $('#signUpModal').modal('hide');
      this.onReset();
      $('#danger').show();
    } else {
      if (successData.processCode === 1){
        $('#signUpModal').modal('hide');
        this.onReset();
        $('#success').show();
      } else {
        this.errorString = successData.info;
      }
    }
    setTimeout(() => {
      $('.alert').hide();
    }, 5000);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  hideSuccessAlert() {
    $('#success').hide();
  }

  hideDangerAlert() {
    $('#danger').hide();
  }

  onSignInClick() {
    $('#signUpModal').modal('hide');
    this.subjectShareService.showLoginModal(true);
    // this.subjectShareService.showSignupModal(true);
  }

}
