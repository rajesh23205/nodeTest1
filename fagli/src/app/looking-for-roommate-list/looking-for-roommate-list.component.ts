import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-looking-for-roommate-list',
  templateUrl: './looking-for-roommate-list.component.html',
  styleUrls: ['./looking-for-roommate-list.component.scss']
})
export class LookingForRoommateListComponent implements OnInit {

  hotelId: String;
  routerLink: String = 'intreatedRoomates';
  routerLink2: String = 'setNotification';
  routerLink3: String = 'updateIntreastedUser';
  intreastedUserList;
  notoficationData: {};
  setResponseData;
  loggedinUserData;
  loggedUserId;
  loggedUserName: any;
  showDanger: Boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.loggedinUserData = this.dataService.getUserData()[0];
    this.loggedUserId = this.loggedinUserData._id;
    this.loggedUserName = this.loggedinUserData.firstName;
    this.activatedRoute.paramMap.subscribe(params => {
      this.hotelId = params['params']['hotelId'];
      this.getPostList();
    });
  }

  getPostList() {
    const data = {
      'hotelId' : this.hotelId
    };

    this.http.post(this.routerLink, data).subscribe(
      suc => {
          this.handleIntreastedList(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  handleIntreastedList(users) {
    this.intreastedUserList = users.data;
  }

  sendResponse(listId) {
    const post = this.getUserPost(listId);
    this.prepairData(post);
    this.setNotification();
    this.prepairDataTosetResponse(post);
    this.setSentResponse();
  }

  setSentResponse() {
    this.http.post(this.routerLink3, this.setResponseData).subscribe(
      suc => {
          this.handleSentResponse(suc);
      },
      err => {
          this.serverError();
      }
    );
  }

  prepairDataTosetResponse(post) {
    this.setResponseData = {
      '_id' : post._id,
      'intreastedUserId' : this.loggedinUserData._id
    };
  }

  prepairData(post) {
    this.notoficationData = {
      'finderUserID': post.finderUserID,
      'finderUserName': post.finderUserName,
      'findRoommatePostId': post._id,
      'visitDateRange': post.dateRange,
      'visitPurpose': post.visitPurpose,
      'intreastedUserName' : this.loggedUserName,
      'intreastedUserId' : this.loggedUserId,
      'NotificationSeen': false
    };
  }

  setNotification() {
    this.http.post(this.routerLink2, this.notoficationData).subscribe(
      suc => {
          this.handleNotificationSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  handleNotificationSuccess(data) {
    // data
  }

  handleSentResponse(successData) {
    this.getPostList();
  }

  serverError() {
    this.showDanger = true;
    setTimeout(() => {
      this.showDanger = false;
    }, 5000);
  }

  hideDangerAlert() {
    this.showDanger = false;
  }

  getUserPost(id) {
    return this.intreastedUserList.find(function(user, index){
            if (user._id === id) {
                return user;
            }
          });
  }

}
