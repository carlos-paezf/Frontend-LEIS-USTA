import { PrimeNgModule } from './../../../prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AssignRolesComponent } from './pages/assign-roles/assign-roles.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { CreateRolComponent } from './pages/create-rol/create-rol.component';


@NgModule({
    declarations: [
        ListComponent,
        AssignRolesComponent,
        CreateRolComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialDesignModule,
        PrimeNgModule
    ]
})
export class UsersModule { }
