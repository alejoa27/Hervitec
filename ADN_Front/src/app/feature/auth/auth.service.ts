import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}
  // ...

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token != null ? !this.tokenExpired(token) : false;
  }

  public isTypeUserTwo(): boolean{
    const type = localStorage.getItem('tipo_usuario');

    return type == '2';
  }
}