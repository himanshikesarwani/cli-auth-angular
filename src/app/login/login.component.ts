import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , ReactiveFormsModule , Validators ,FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm : FormGroup;
   error = false;
   errorMessage = '';
   constructor(private fb: FormBuilder, private authService: AuthenticationService) { }
  
  ngOnInit():any {
     let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; 
     this.loginForm = this.fb.group({
     'email' : ['', Validators.required],
      password : ['', Validators.required]
    }) 
    this.authService.logOut();
  }

  login(event, email, password):any {
    		this.authService.login(email, password);
        event.preventDefault();
  }

  logout(){
    this.authService.logOut();
  }

  
  

}
