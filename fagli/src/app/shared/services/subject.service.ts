import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectSharedService {

  private imageCropperSource: Subject<Boolean>;
  public imageCropper$: Observable<Boolean>;

  private showSignupModalSource: Subject<Boolean>;
  public showSignupModal$: Observable<Boolean>;

  private showLoginModalSource: Subject<Boolean>;
  public showLoginModal$: Observable<Boolean>;

  private hideSignupModalSource: Subject<Boolean>;
  public hideSignupModal$: Observable<Boolean>;

  private hideLoginModalSource: Subject<Boolean>;
  public hideLoginModal$: Observable<Boolean>;

  private UserDataModalSource: Subject<Boolean>;
  public UserDataModal$: Observable<Boolean>;

  private loaderSource: Subject<Boolean>;
  public loader$: Observable<Boolean>;

  private successErrorSurce: Subject<any>;
  public successError$: Observable<any>;

  constructor() {
    this.imageCropperSource = new Subject<Boolean>();
    this.imageCropper$ = this.imageCropperSource.asObservable();

    this.showSignupModalSource = new Subject<Boolean>();
    this.showSignupModal$ = this.showSignupModalSource.asObservable();

    this.showLoginModalSource = new Subject<Boolean>();
    this.showLoginModal$ = this.showLoginModalSource.asObservable();

    this.hideSignupModalSource = new Subject<Boolean>();
    this.hideSignupModal$ = this.hideSignupModalSource.asObservable();

    this.hideLoginModalSource = new Subject<Boolean>();
    this.hideLoginModal$ = this.hideLoginModalSource.asObservable();

    this.UserDataModalSource = new Subject<Boolean>();
    this.UserDataModal$ = this.UserDataModalSource.asObservable();

    this.loaderSource = new Subject<Boolean>();
    this.loader$ = this.loaderSource.asObservable();

    this.successErrorSurce = new Subject<Boolean>();
    this.successError$ = this.successErrorSurce.asObservable();
  }

  showImageCropper(shouldShow: Boolean) {
    this.imageCropperSource.next(shouldShow);
  }

  /**
   * Emit event to display signup modla popup
   * @param shouldShow: boolean to check should show or not
   */
  showSignupModal(shouldShow: Boolean) {
    this.showSignupModalSource.next(shouldShow);
  }

  /**
   * Emit event to display signup modla popup
   * @param shouldShow: boolean to check should show or not
   */
  showLoginModal(shouldShow: Boolean) {
    this.showLoginModalSource.next(shouldShow);
  }

  /**
   * Emit event to hide signup modla popup
   * @param shouldHide: boolean to check should show or not
   */
  hideSignupModal(shouldShow: Boolean) {
    this.showSignupModalSource.next(shouldShow);
  }

  /**
   * Emit event to hide signup modla popup
   * @param shouldHide: boolean to check should show or not
   */
  hideLoginModal(shouldShow: Boolean) {
    this.showLoginModalSource.next(shouldShow);
  }

  /**
   * Emit event to show user name in header
   * @param userData: data of logged in user
   */
  showUserNameInHeader(userData) {
    this.UserDataModalSource.next(userData);
  }

  /**
   * Emit event to show page loader
   * @param shouldShow: value to show loader
   */
  showLoader(shouldShow: Boolean) {
    this.loaderSource.next(shouldShow);
  }

    /**
   * Emit event to show error success
   * @param popupData: value to show loader
   */
  errorSuccessPopup(popupData: any) {
    this.successErrorSurce.next(popupData);
  }
}
