import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css', '../login/login.component.css']
})
export class LogoutComponent implements OnInit {

    logoutForm = new FormGroup({
    });

    constructor(private router: Router, private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
    }


    onSubmit(): void {
        if (confirm('Are sure you want to Logout ?')) {
            this.tokenStorageService.signOut();
            this.router.navigate(['/login']);
        }
    }
}