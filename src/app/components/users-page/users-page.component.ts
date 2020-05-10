import {Component, OnInit} from '@angular/core';

import {ApiService} from '../../services/api.service';

import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService
  ) {
  }

  users = [];
  usersBought = [];

  columns = [
    'user',
    'email',
    'telephone',
    'infoBaing',
    'createdAt'
  ];

  ngOnInit() {
    this.apiSvc.getUsers().subscribe(
      (res: any) => {
        this.users = res.data;
        // parse info status users
        this.usersBought = res.data.filter(user => user.status === '1' || user.status === '2');
      },
      (err: any) => {
        // check token if token invalid - logout
        if (err.status === 401) {
          this.authSvc.logout();
        }
      }
    );
  }

}
