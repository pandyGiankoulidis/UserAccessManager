import { Component, Inject, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { response } from 'express';
import { Router, ActivatedRoute } from '@angular/router';
import { APILoginService } from '../_services/apilogin.service';
import { TokenStorageService } from '../_services/token-storage.service';


export interface response {
  message: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  errorMessage = "";
  falseCredentials = false;
  formFieldClass = "form-field d-flex align-items-center";

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private apiLoginService: APILoginService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  get uname() {
    return this.loginForm.controls['username'];
  }

  get pword() {
    return this.loginForm.controls['password'];
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.apiLoginService.login(this.loginForm.value.username!, this.loginForm.value.password!).
        subscribe({
          next: event => {
            if (event.accessToken == null) {
              this.falseCredentials = true;
              this.errorMessage = event.message;
            } else {
              this.tokenStorageService.saveToken(event.accessToken);
              this.tokenStorageService.saveUser(event);
              this.reloadPage();
            }
          },
          error: event => {
            this.falseCredentials = true;
            this.errorMessage = event.message;
          }

        });
    }
  }


  reloadPage(): void {
    this.router.navigate(['/dashboard'])
  }
}
