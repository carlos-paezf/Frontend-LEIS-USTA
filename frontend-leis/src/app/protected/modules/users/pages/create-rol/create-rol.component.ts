import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/protected/interfaces/roles';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {
  roles: Roles[];

  selectedRoles: Roles[];
  constructor() {

    this.roles = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

  this.selectedRoles = [];
   }


  ngOnInit(): void {
  }

}
