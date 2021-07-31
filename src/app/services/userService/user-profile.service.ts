import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @param userInterest
   * @returns
   */
  public addUserInterest(userInterest: any) {
    return this.http.post(`${baseUrl}/interest/create`, userInterest);
  }

  public deleteUserInterest(userInterest) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: userInterest.userId,
        userInterestId: userInterest.userInterestId
      },
    };

    return this.http.delete(`${baseUrl}/interest/delete`, options);
  }
}
