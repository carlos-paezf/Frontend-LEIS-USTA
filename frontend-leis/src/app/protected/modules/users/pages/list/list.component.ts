import { UserService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/protected/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})

export class ListComponent implements OnInit {

  users: User[] =[];
  statuses: any[] = [];
  loading: boolean = true;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {

      this._userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.loading = false;
    })

    this.statuses = [

        {label: 'Al día', value: 'qualified'},
        {label: 'En mora', value: 'unqualified'}
      ]
  };
};
