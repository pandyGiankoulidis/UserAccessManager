import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { APILoginService } from '../_services/apilogin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../login/login.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  signupForm: FormGroup;
  errorMessage = "";
  falseSignup = false;
  roles: any = ['USER', 'ADMIN', 'MODERATOR'];

  constructor(private formBuilder: FormBuilder,
    private apiLoginService: APILoginService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {

    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      age: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
      role: new FormControl(' ')
    })
  }

  ngOnInit(): void {
  }

  get uname() {
    return this.signupForm.controls['username'];
  }

  get pword() {
    return this.signupForm.controls['password'];
  }

  get email() {
    return this.signupForm.controls['email'];
  }

  get age() {
    return this.signupForm.controls['age'];
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.apiLoginService.signup(this.signupForm.value.username!,
        this.signupForm.value.password!,
        this.signupForm.value.email!,
        this.signupForm.value.age!,
        [(this.signupForm.value.role!).toLowerCase()]).
        subscribe({
          next: event => {

            this.apiLoginService.login(this.signupForm.value.username!, this.signupForm.value.password!).
              subscribe({
                next: event => {
                  if (event.accessToken == null) {
                    this.errorMessage = "Something wrong with signup";
                  } else {
                    this.tokenStorageService.saveToken(event.accessToken);
                    this.tokenStorageService.saveUser(event);
                    this.router.navigate(['/dashboard'])
                  }
                },
                error: event => {
                  this.errorMessage = "Something wrong with signup";
                }

              });

          },

          error: event => {
            this.falseSignup = true;
            this.errorMessage = "* Username or email is already taken";
          }
        });
      this.submitted = true;
    }

  }
}
