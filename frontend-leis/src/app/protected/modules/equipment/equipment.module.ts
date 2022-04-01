import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { ListComponent } from './pages/list/list.component';
import { TechnicalDataSheetsComponent } from './pages/technical-data-sheets/technical-data-sheets.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
    declarations: [
        ListComponent,
        TechnicalDataSheetsComponent,
        ManageUsersComponent,

    ],
    imports: [
        CommonModule,
        EquipmentRoutingModule,
        MaterialDesignModule,
        PrimeNgModule

    ]
})
export class EquipmentModule { }
