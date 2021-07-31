import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommedationService {

  http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  //fetch recommedation image ids
  fetchRecommedationImageIds() {
    const recommedationImageIds = environment.recommedationImageIds;
    return this.http.get(recommedationImageIds);
  }
}
