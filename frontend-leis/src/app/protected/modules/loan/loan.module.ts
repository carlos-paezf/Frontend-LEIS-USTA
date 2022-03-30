import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ListComponent } from './pages/list/list.component';
import { EquipmentLoanComponent } from './pages/equipment-loan/equipment-loan.component';


@NgModule({
    declarations: [
        ListComponent,
        EquipmentLoanComponent
    ],
    imports: [
        CommonModule,
        LoanRoutingModule
    ]
})
export class LoanModule { }
