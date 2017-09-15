import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
//import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthenticationService, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }

    // // Check to see if a user has a valid JWT
    // if (localStorage.getItem('id_token')) {
    //   // If they do, return true and allow the user to load the home component
    //   return true;
    // }

    // // If not, they redirect them to the login page
    // this.router.navigate(['/login']);
    // return false;
  }

}
