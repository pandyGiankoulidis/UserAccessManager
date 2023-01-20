import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APILoginService } from '../_services/apilogin.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css', '../login/login.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  submitted = false;
  errorMessage = "";
  falseEmail = false;
  notsimilarPasswords = false;

  constructor(private apiLoginService: APILoginService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      newpassword: [null, [Validators.required, Validators.minLength(4)]],
      renternewpassword: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.resetForm.controls['email'];
  }

  get newpassword() {
    return this.resetForm.controls['newpassword'];
  }

  get renternewpassword() {
    return this.resetForm.controls['renternewpassword'];
  }

  onSubmit(): void {
    this.submitted = true;
    this.notsimilarPasswords = false;
    if (this.resetForm.valid) {

      if (this.resetForm.value.newpassword === this.resetForm.value.renternewpassword) {
        this.apiLoginService.reset(this.resetForm.value.email!, this.resetForm.value.newpassword!).subscribe({
          next: event => {
            this.router.navigate(['./login']);
          },
          error: event => {
            this.falseEmail = true;
            this.errorMessage = "** Email address provided does not correspond to a user. Please, sign up.";
          }
        });

      } else {
        this.notsimilarPasswords = true;
      }

    } else {
      this.errorMessage = "* Email address must have the special character @";
    }
  }
}



