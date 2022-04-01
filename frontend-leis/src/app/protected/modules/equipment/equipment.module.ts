import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { ListComponent } from './pages/list/list.component';
import { TechnicalDataSheetsComponent } from './pages/technical-data-sheets/technical-data-sheets.component';


@NgModule({
    declarations: [
        ListComponent,
        TechnicalDataSheetsComponent
    ],
    imports: [
        CommonModule,
        EquipmentRoutingModule
    ]
})
export class EquipmentModule { }
