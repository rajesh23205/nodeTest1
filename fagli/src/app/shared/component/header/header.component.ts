import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SubjectSharedService } from '../../services/subject.service';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentComponent: any = 'home';
  userData: any = '';
  userName: String = 'Profile';
  routerLink: String = 'logout';
  routerLink2: String = 'notificationData';
  isLoggedIn: Boolean = false;
  userId: String;
  newNotificationCount: any;

  constructor(
    private router: Router,
    private subjectShareService: SubjectSharedService,
    private http: ApiService,
    private dataService: DataService
  ) {

    router.events.subscribe((event: Event) => {
      this.updateActiveClass(this.router.url);
    });

    // this.subjectShareService.showLoginModal$.subscribe((show: Boolean) => {
    //   $('#loginModal').modal('show');
    // });

    this.subjectShareService.UserDataModal$.subscribe((userData) => {
      this.setUserData(userData);
    });

  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    const loginData = this.dataService.getUserData();
    this.isLoggedIn = false;
    if (loginData) {
      this.setUserData(loginData);
    }
    // else {
    //   this.router.navigate(['/home']);
    // }
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
    this.http.post(this.routerLink2, data).subscribe(
      suc => {
          this.manageNotification(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  manageNotification(data) {
    this.newNotificationCount = data.data.length;
    this.setNotificationData();
  }

  setNotificationData() {}

  /**
   * @use: Make nev bar sellected
   * @param currentUrl : current navigated url in browser
   */
  updateActiveClass(currentUrl: String) {
    if (currentUrl.includes('home')) {
      this.currentComponent = 'home';
    } else if (currentUrl.includes('createDebate')) {
      this.currentComponent = 'createDebate';
    } else if (currentUrl.includes('registerHotel')) {
      this.currentComponent = 'registerHotel';
    } else if (currentUrl.includes('findHotel')) {
      this.currentComponent = 'findHotel';
    } else if (currentUrl.includes('profile')) {
      this.currentComponent = 'profile';
    } else if (currentUrl.includes('hotelDetails')) {
      this.currentComponent = 'hotelDetails';
    } else if (currentUrl.includes('notification')) {
      this.currentComponent = 'notification';
    } else if (currentUrl.includes('allRequest')) {
      this.currentComponent = 'allRequest';
    } else if (currentUrl.includes('myHotels')) {
      this.currentComponent = 'myHotels';
    }
  }

  /**
   * Logout user
   */
  logoutClickHandler() {
    const userData = { '_id': this.userId };
    this.http.post(this.routerLink, userData).subscribe(
      suc => {
          this.handleSuccess(suc);
      },
      err => {
          console.log(err );
      }
    );
  }

  /**
   * logout success handler
   */
  handleSuccess(data) {
    if ( data[0]._id === this.userId) {
      const isClear = this.dataService.clearUserData();
      console.log(isClear);
      this.checkLogin();
    }
    this.router.navigate(['/home']);
  }

  /**
   * display signup modal
   */
  showSignupModal() {
    this.subjectShareService.showSignupModal(true);
  }

    /**
   * display login modal
   */
  showLoginModal() {
    this.subjectShareService.showLoginModal(true);
  }

}
