import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access-token')) { 
      return true;
    } else {
      
      this.router.navigate(['login', { queryParams: state.url},]);
  
      return false;
      // return true;
    }

  }
}

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('access-token')) {
      return true;
    } else {
      if(!localStorage.getItem('user_type')){
      this.router.navigate(['home']);
      }else{
        this.router.navigate(['seller/dashboard']);
      }
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem('user_type')) {
      return true;
    } else {
      this.router.navigate(['login', { queryParams: state.url},]);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SubLoginGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_type')) {
      return true;
    } else {
      this.router.navigate(['seller/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class OptionalAuthGuardService implements CanActivate {

  constructor(private router: Router) { }
 
  canActivate() {
    if (!localStorage.getItem('access-token')) {
      return true;
    } else {
      if (localStorage.getItem('access-token')) { 
        if(localStorage.getItem('user_type') == '1'){
        this.router.navigate(['seller/dashboard']);
        }
        if(localStorage.getItem('user_type') != '1'){
          return true
        }
      }
      return false;
    }
  }
}



