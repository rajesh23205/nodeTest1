import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  routerLink: String = 'notificationData';
  routerLink2: String = 'setNotificationSeen';
  routerLink3: String = 'getAllNotification';
  isLoggedIn: boolean;
  showMore: Boolean = false;
  showAll: Boolean = true;
  userData: any;
  userName: any;
  userId: any;
  notificationData;

  constructor(
    private http: ApiService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.checkLogin();
  }
  checkLogin() {
    const loginData = this.dataService.getUserData();
    this.isLoggedIn = false;
    if (loginData) {
      this.setUserData(loginData);
    }
  }

  setUserData(userData) {
    this.userData = userData[0];
    this.userName = this.userData.firstName;
    this.userId = this.userData._id;
    this.isLoggedIn = true;
    this.getNoficationData();
  }

  getNoficationData() {
    const data = {
      'userId' : this.userId,
      'isSeen' : false
    };
    this.http.post(this.routerLink, data).subscribe(
      suc => {
          this.manageNotification(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  manageNotification(data) {
    this.notificationData = data.data;
    this.setNotificationSeen();
  }

  setNotificationSeen() {
    const data = {
      'userId' : this.userId
    };
    this.http.post(this.routerLink2, data).subscribe(
      suc => {
          // this.updateNotificationCount(suc);
          // this.getAllNotification();
      },
      err => {
          console.log(err );
      }
    );
  }

  getAllNotification() {
    const data = {
      'userId' : this.userId
    };
    this.http.post(this.routerLink3, data).subscribe(
      suc => {
          this.updateByAllNotification(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  updateByAllNotification(data) {
    this.notificationData = data.data;
    this.showMore = true;
    this.showAll = false;
  }

  loadMoreData() {
    // code
  }

  updateNotificationCount(data) {
    // code;
  }

}
