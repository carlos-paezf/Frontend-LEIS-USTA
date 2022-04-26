import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css'],
})
export class AssignRolesComponent implements OnInit {

  nodes: any[];
  selectedNode: any;

  constructor() {
    this.nodes = [];
  }
  ngOnInit(): void {
  }
}
