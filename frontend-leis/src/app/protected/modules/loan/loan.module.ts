import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ListComponent } from './pages/list-users/list-users.component';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { EquipmentLoanComponent } from './pages/equipment-loan/equipment-loan.component';
import { CreateLoanComponent } from './pages/create-loan/create-loan.component';
import { ListLoansComponent } from './pages/list-loans/list-loans.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ListComponent,
        ListLoanEquipmentComponent,
        EquipmentLoanComponent,
        CreateLoanComponent,
        ListLoansComponent,


    ],
    imports: [
        CommonModule,
        LoanRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule
    ]
})
export class LoanModule { }
