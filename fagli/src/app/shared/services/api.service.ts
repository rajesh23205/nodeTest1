import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  // private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://fagli.herokuapp.com';
  private pinCodeUrl = 'https://api.postalpincode.in/pincode';


  post(router: String, data: any ) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.basic
    });
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}` + `/` + router, data, options);
  }

  get(router: String, ) {
    return this.http.get(`${this.baseUrl}` + `/` + router);
  }

  getPincode(pincode: String, ) {
    return this.http.get(`${this.pinCodeUrl}` + `/` + pincode);
  }
}
