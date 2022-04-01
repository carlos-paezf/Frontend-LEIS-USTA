import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AssignRolesComponent } from './pages/assign-roles/assign-roles.component';


@NgModule({
    declarations: [
        ListComponent,
        AssignRolesComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
