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

  currentToken(): Token {
    // TODO: Enable after implementation
   const { access_token } = JSON.parse(localStorage.getItem('currentUser')!);
   const token:Token={ access_token }
   return  token;
  }

  // Pass in function expiration date to check token 
  isTokenExpired():boolean { 
    const { access_token } = JSON.parse(localStorage.getItem('currentUser')!);
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
