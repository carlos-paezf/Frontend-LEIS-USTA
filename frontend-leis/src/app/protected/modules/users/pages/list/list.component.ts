import { UserService } from './../../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/protected/interfaces';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})

export class ListComponent implements OnInit {

  users: User[] =[];
  user: User;
  userDialog: boolean;
  statuses: any[] = [];
  loading: boolean = true;

  constructor(private _userService: UserService) {
    this.user = { id: 0, name:"", lastName:"", email:"", rol:"", status: "", loans:""};
    this.userDialog =true;
  }

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

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {

  }
};
