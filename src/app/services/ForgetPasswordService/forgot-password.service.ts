import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  public updatePassword(password: any) {
    return this.http.post(`${baseUrl}/updatePassword`, password);
  }

  sendEmail(data: any) {
    return this.http.post(`${baseUrl}/sendemail`, data);
  }
}
