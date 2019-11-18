import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: {};

  constructor(public route: Router, public auth: AuthenticationService) { }
  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.loggedInUser = user;
    })
  }
  headerBtnClk(selectedbutton) {
    if (selectedbutton != "" && selectedbutton != "logout") {
      this.route.navigate(["/auth/", selectedbutton]);
    } else if (selectedbutton == "logout"){
      this.auth.logout();
      this.route.navigate(["/auth/login"]);
    }
  }
}
