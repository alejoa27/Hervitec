import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeUserGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {    
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    } 

    if (!this.auth.isTypeUserTwo()) {
      this.router.navigate(['/home'], {queryParams: {error: 'Usuario no tiene permiso'}});
      return false;
    }
    return true;
  }
}
