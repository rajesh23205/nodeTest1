import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { SubjectSharedService } from '../shared/services/subject.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private loginData: any;
  constructor (
    private router: Router,
    private subjectShareService: SubjectSharedService,
    private dataService: DataService
    ) {

  }

  canActivate() {
    const loginData = this.dataService.getUserData();
    if (loginData) {
      return true;
    } else {
      this.subjectShareService.showLoginModal(true);
      return false;
    }
  }
}
