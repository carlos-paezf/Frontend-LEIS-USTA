import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { EquipmentLoanComponent } from './pages/equipment-loan/equipment-loan.component';
import { LoanRequestComponent } from './pages/loan-request/loan-request.component';
import { ReturnLoanComponent } from './pages/return-loan/return-loan.component';


@NgModule({
    declarations: [
        ListComponent,
        ListLoanEquipmentComponent,
        EquipmentLoanComponent,
        LoanRequestComponent,
        ReturnLoanComponent
    ],
    imports: [
        CommonModule,
        LoanRoutingModule,
        PrimeNgModule
    ]
})
export class LoanModule { }
