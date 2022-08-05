import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoginRta, User } from '../models/auth.model';
import { TokenService } from './token.service';

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
    this.getProfile().subscribe(user => {
      this.authState.next(user)
    });
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
  
  login(email: string, password: string):Observable<LoginRta> {
    const url = `${environment.API_URL}/user/authenticate`;
    return this.http.post<LoginRta>(url, { email, password } )
    .pipe(
      tap( (response:LoginRta) => {
        this.tokenService.saveData(response)
        this.authState.next(response.user)
      })
    )
  }

  setAuthState(user: User | null) {
    this.authState.next(user);
  }

  getProfile() {
    const url = `${environment.API_URL}/user/profile`;
    return this.http.get<User>(url);
  }

  getAll():Observable<User[]> {
    //const headers = new HttpHeaders().set('content-type', 'application/json');
    const url = `${environment.API_URL}/user`;
    return this.http.get<User[]>(url);
  }


  logout() {
    this.tokenService.clearToken();
  }
}
