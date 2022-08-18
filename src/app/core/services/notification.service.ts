import { Injectable } from '@angular/core';

import { environment as env } from '@env/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NotificationCountResult } from '@core/models/notification-count-result';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationResult } from '@core/models/notification-result';
import { ReqResponseData } from '@core/models/req-response-data';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }  
  
  // getNotificationCount(){  
  //   const url = `${ env.endPointV1 }/notifications/notificationcount`;
  //   return this.http.get<ReqResponseData<NotificationCountResult>>(url);
  // }  
  getNotificationCount(): Observable<ReqResponseData<NotificationCountResult>> {  
    const url = `${ env.API_URL }/notifications/notificationcount`;
    return this.http.get<ReqResponseData<NotificationCountResult>>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getNotificationMessage(): Observable<ReqResponseData<NotificationResult>> {  
    const url = `${ env.API_URL }/notifications/notificationresult`;  
    return this.http.get<ReqResponseData<NotificationResult>>(url)  
      .pipe(  
        catchError( this.handleError )  
      );  
  }  
  // getNotificationMessage(): Observable<Array<NotificationResult>> {  
  //   const url = `${ env.endPointV1 }/notifications/notificationresult`;  
  //   //console.log('notification message-->',url)  
  //   return this.http.get<Array<NotificationResult>>(url)  
  //     .pipe(  
  //       catchError( this.handleError )  
  //     );  
  // }  
  
  deleteNotifications(): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${ env.API_URL }/deletenotifications`;  
    return this.http.delete(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err:any) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
}  
