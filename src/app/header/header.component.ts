import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public route: Router) { }
  ngOnInit() {
  }
  
  headerBtnClk(selectedbutton) {
    if (selectedbutton != "") {
      console.log("selectedbutton--->", selectedbutton);
      this.route.navigate(["/login/", selectedbutton]);
    }
  }
}
