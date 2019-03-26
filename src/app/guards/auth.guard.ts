import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable() 
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // reach out to authService to see if the user is authenticated or not 
    if (this.authService.isAuth()) {
      return true
    } else {
      // if not, redirect user to the sign in page
      this.router.navigate(['/signin'])
    }
  }
}