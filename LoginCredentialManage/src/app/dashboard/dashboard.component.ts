import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  admin: any;
  moderator: any;
  usr: any;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();

    this.userService.getUserContent().subscribe({
      next: event => {
        this.usr = "Successfull user content access. Message: " + JSON.parse(event).message;
      },
      error: event => {
        this.usr = "Unsuccessful user content access. Message: " + event.message;
      }
    });

    this.userService.getAdminContent().subscribe({
      next: event => {
        this.admin = "Successfull admin content access.  Message: " + JSON.parse(event).message;
      },
      error: event => {
        this.admin = "Unuccessfull admin content access.  Message: " + event.message;
      }
    });


    this.userService.getModeratorContent().subscribe({
      next: event => {
        this.moderator = "Successfull moderator content access.  Message: " + JSON.parse(event).message;
      },
      error: event => {
        this.moderator = "Unuccessfull moderator content access.  Message: " + event.message
      }
    })
  }

}
