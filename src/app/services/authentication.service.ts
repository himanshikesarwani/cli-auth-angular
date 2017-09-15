import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper  } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class AuthenticationService {

   public token: string;   
   jwtHelper: JwtHelper = new JwtHelper();
   constructor(private router: Router, private httpService:Http){
                // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('data'));
        this.token = currentUser && currentUser.token;

    }

    logOut(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
    }

    public login(email,password){
         let headers = new Headers();
         headers.append('Content-Type', 'application/json');
         let body = JSON.stringify({ email: email,  password: password });
         let options = new RequestOptions({ headers: headers });
         return  this.httpService.post('http://localhost:81/learnl/public/api/User/Authenticate', body, options)
                 .subscribe(
                  response => {     
                    let token = response.json() && response.json().data.user.authToken;
                    if(token){
                      this.token = token;
                      localStorage.setItem('id_token',  JSON.stringify({ data: response.json().data, token: token })); 
                      this.router.navigate(['home']);
                    }
        },
        error => {
          console.log(error.text());
        }
      );
    }

  loggedIn() {
    console.log(tokenNotExpired);
    
    return tokenNotExpired();
  }
}
