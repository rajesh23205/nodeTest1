import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ApiService } from '../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId: String;
  loggedInUserId: String;
  routerLink: String = 'profile';
  firstName: String;
  lastName: String;
  emailId: String;
  showsuccess: Boolean = false;
  showDanger: Boolean = false;
  submitted: Boolean = false;
  profileUpdateForm: FormGroup;
  routerLink2: String = 'updateProfile';

  constructor(
    private dataService: DataService,
    private http: ApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params['params']['userId'];
    });
    this.loggedInUserId = this.dataService.getUserData()[0]._id;
    this.callProfileData();
    this.bindModalEvent();
    this.createFormController();
  }

  get p() { return this.profileUpdateForm.controls; }

  createFormController() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      emailId: ['',  [Validators.required, Validators.email]]
    });
  }

  callProfileData() {
    const data = { 'userId': this.userId };
    this.http.post(this.routerLink, data).subscribe(
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

    if (this.profileUpdateForm.invalid) {
        return;
    }

    this.http.post(this.routerLink2, this.profileUpdateForm.value).subscribe(
      suc => {
          this.handleUpdateSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  handleUpdateSuccess(data) {
    if (data.res === 'success') {
      $('#profileDetailsModal').modal('hide');
      this.showsuccess = true;
      this.callProfileData();
    } else {
      this.showDanger = true;
    }
    setTimeout(() => {
      this.showDanger = false;
      this.showsuccess = false;
    }, 5000);
  }

  handleSuccess(data) {
    if (data.res === 'success') {
      this.updateData(data.data);
    } else {

    }
  }

  bindModalEvent() {
    const that = this;
    $('#profileDetailsModal').on('show.bs.modal', function(e) {
      that.profileUpdateForm.get('firstName').setValue(that.firstName);
      that.profileUpdateForm.get('lastName').setValue(that.lastName);
      that.profileUpdateForm.get('emailId').setValue(that.emailId);
      that.profileUpdateForm.get('userId').setValue(that.userId);
    });
  }

  updateData(data) {
    this.firstName = data[0].firstName;
    this.lastName = data[0].lastName;
    this.emailId = data[0].email;
  }

  hideSuccessAlert() {
    this.showsuccess = false;
  }

  hideDangerAlert() {
    this.showDanger = false;
  }

}
