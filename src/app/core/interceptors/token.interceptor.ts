import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { TokenService } from '../services/token.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { Token } from '../models/auth.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private snackService: NotificationService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = this.addToken(request);
    return next.handle(request).pipe(
      retry(1),   
      catchError((error: HttpErrorResponse) => {
          return this.handleError(error);      
      }));;
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.currentToken();
    if (token.access_token && !this.tokenService.isTokenExpired()) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
      });
      return authReq;
    }
    return request;
  }
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.tokenService.currentToken();
  //   // if (!token.access_token || this.tokenService.isTokenExpired()) {
  //   //     return this.expirationToken(request,next);
  //   // }
  //   // if (token.access_token && !this.tokenService.isTokenExpired()) {
  //   //     return this.addToken(request,next,token);
  //   // }else{
  //   //     return next.handle(request);
  //   // }
  // }

  private expirationToken(request: HttpRequest<unknown>, next: HttpHandler){
    this.snackService.info('Your session has expired');
      this.router.navigate(['/login']);
      return next.handle(request).pipe(
        retry(1),   
        catchError((error: HttpErrorResponse) => {
            return throwError( ()=>error );    
        }));
  }
  // private addToken(request: HttpRequest<unknown>, next: HttpHandler,token:Token) {
  //   if (token.access_token && !this.tokenService.isTokenExpired()) {
  //     const authReq = request.clone({
  //       headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
  //     });
  //     return next.handle(authReq);
  //   }
  //   else {
  //     return next.handle(request).pipe(
  //         retry(1),   
  //         catchError((error: HttpErrorResponse) => {
  //             return this.handleError(error);      
  //         }));
  //   }
  //   //return request;
  // }
  
  private handleError(error:HttpErrorResponse){
       
    // let errorMessage : MessageError=new MessageError();
    // if (error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage.error = `Client-side error: ${error.error.message}`;
    //   errorMessage.status=`estado: ${error.error.status}`;
    //   errorMessage.message=`mensaje : ${error.message}`;
    //   errorMessage.side='front';
    // } else {
    //   // backend error
    //   errorMessage.error = `Server-side error: ${error.error}`;
    //   errorMessage.errors = error.error?.errors
    //   errorMessage.status=`estado: ${error.status}`;
    //   errorMessage.message=`mensaje : ${error.message}`;
    //   errorMessage.side='server';
    // }    
    
    // Obtain dependencies at the time of the error
    // This is because the GlobalErrorHandler is registered first
    // which prevents constructor dependency injection
     //const logger = this.injector.get(NGXLogger);   
      // Log  the error
     //logger.error(errorMessage);
    //  console.error('interceptor-->',error.error?.errors)
     switch (error.status) {

        case 0:      //login
            //this.router.navigateByUrl("login");
            break;
       case 401:      //login
            this.snackService.info('Your session has expired');
            this.router.navigateByUrl("login");
            break;
        case 403:     //forbidden
            this.router.navigateByUrl("unauthorized");
            break;
    }
     // Re-throw the error
    return throwError( ()=>error);
  }
}
