import { Injectable } from '@angular/core';
import { LoginRta, Token } from '../models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveData(resp:LoginRta) {
    localStorage.setItem('currentUser', JSON.stringify({
      access_token: resp.access_token,
      email: resp.user.email,
      alias: resp.user.email.split('@')[0],
      fullName: resp.user.email.split('@')[0]
    }));
    
  }

  currentToken(): string | null {
    // TODO: Enable after implementation
   let current = localStorage.getItem('currentUser');
   if(!current){
      return null;
   } 
   const { access_token } = JSON.parse(current!);
   return access_token;
  }

  // Pass in function expiration date to check token 
  isTokenExpired():boolean { 
    let current = localStorage.getItem('currentUser');
    if(!current){
      return true;;
    } 
    const { access_token } = JSON.parse(current!);
    if (this.jwtHelper.isTokenExpired(access_token)) {
      console.log(true, 'token is expired')
      return true;
    } else { 
      console.log(false, 'token is not expired') 
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
