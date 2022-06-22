import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  isAuth: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  onClose() {

  }

  onLogout(): void {

  }

}
