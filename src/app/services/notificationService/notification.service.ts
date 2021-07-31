import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { RecommedationService } from '../recommedationService/recommedation.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  webSocketEndPoint: string = environment.webSocketUrl;
  topic: string = environment.webSocketReceivedUrl;

  stompClient: any;

  data: any = null;
  dataLength = 0;

  constructor(private _recommedation: RecommedationService) {
    // if data is null then it will run
    if (this.data == null) {
      this._recommedation.fetchRecommedationImageIds().subscribe(data => {
        this.data = data
        this.dataLength = this.data.length
      });
    }

    this._connect();
  }

  /**
   * This function will help to connect with web socket backend api
   */
  _connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        _this.onMessageReceived(sdkEvent);
      });
    }, this.errorCallBack);
  };

  /**
   * This function will help to disconnect with web socket backend api
   */
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  /**
   * This function will run when any error come in web socket.
   * @param error error details
   */
  errorCallBack(error) {
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * This function send request to the web socket apis.
   * @param message recommend id in number form.
   */
  _send(message) {
    this.stompClient.send(environment.webSocketSendUrl, {}, JSON.stringify(message));
  }

  /**
   * This function will recieved the data from apis.
   * @param received recommend object
   */
  onMessageReceived(message) {
    this.data.push(JSON.parse(message.body));
    this.dataLength = this.data.length
  }
}
