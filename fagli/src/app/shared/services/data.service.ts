import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() { }

  setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  clearUserData() {
    return localStorage.removeItem('userData');
  }
}
