import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment as env } from '@env/environment';
import { LoginRta, User, UserInfo } from '@core/models/auth.model';
import { TokenService } from './token.service';

import { IUserCreateDto, IUserDto } from '@coreinterfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<User | null>(null);
  authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    
  }



  // login(email: string, password: string) {
  //   const url = `${environment.API_URL}/user/authenticate`;
  //   return this.http.post<LoginRta>(url, { email, password } )
  //   .pipe(
  //     tap(response => this.tokenService.saveToken(response.access_token)),
  //     switchMap(_ => this.getProfile()),
  //     tap(user => this.authState.next(user))
  //   )
  // }
  // setProfile(){
  //   this.getProfile().subscribe(user => {
  //     this.authState.next(user)
  //   });
  // }
  login(email: string, password: string):Observable<LoginRta> {
    const url = `${env.API_URL}/user/authenticate`;
    return this.http.post<LoginRta>(url, { email, password } )
    .pipe(
      tap( (response:LoginRta) => {
        
        if(!response) return of(response); // or any other stream like of('') etc.
        
        this.tokenService.saveData(response);
        this.authState.next(response.user);
        return response;
      })
      // catchError(
      //     (error: HttpErrorResponse): Observable<any> => {
      //         // we expect 404, it's not a failure for us.
      //         if (error.status === 404) {
      //             return of(null); // or any other stream like of('') etc.
      //         }
  
      //         // other errors we don't know how to handle and throw them further.
      //         return throwError(()=>error);
      //     },
      // ),
    )
  }

  setAuthState(user: User | null) {
    this.authState.next(user);
  }

  getProfile() {
    const url = `${env.API_URL}/user/profile`;
    return this.http.get<User>(url);
  }

  currentUser():UserInfo | null{
    let current = localStorage.getItem('currentUser');
    if(!current) return null;
    
    const { email, alias, fullName }:UserInfo = JSON.parse(current!);
    return { email,alias,fullName };
  }

  getAll():Observable<User[]> {
    return this.http.get<User[]>( `${env.API_URL}/user` );
  }

  getById(id:string):Observable<User> {
    return this.http.get<User>( `${env.API_URL}/user/${id}` );
  }

  register(register:IUserCreateDto){
    return this.http.post<LoginRta>(`${env.API_URL}/user/register`,register)
    .pipe(
      tap( (response:LoginRta) => {
        
        if(!response) return of(response); // or any other stream like of('') etc.
        
        this.tokenService.saveData(response);
        this.authState.next(response.user);
        return response;
      }),
      catchError(
          (error: HttpErrorResponse): Observable<any> => {
              // we expect 404, it's not a failure for us.
              if (error.status === 404) {
                  return of(null); // or any other stream like of('') etc.
              }
  
              // other errors we don't know how to handle and throw them further.
              return throwError(()=>error);
          },
      ),
    )
  }
  
  create(create:IUserCreateDto):Observable<IUserDto> {
    return this.http.post<IUserDto>( `${env.API_URL}/user`,create );
  }

  update(update:IUserDto):Observable<IUserDto> {
    return this.http.put<IUserDto>( `${env.API_URL}/user`,update );
  }

  delete(id:string) {
    return this.http.delete( `${env.API_URL}/user/${id}` );
  }

  logout() {
    this.tokenService.clearToken();
  }

  passwordResetRequest(email: string) {
    return of(true);
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
      //return of(true).delay(1000);
      return of(true);
  }

  passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
      //return of(true).delay(1000);
      return of(true);
  }

}
