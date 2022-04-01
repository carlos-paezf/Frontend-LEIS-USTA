import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
    declarations: [
        ListComponent,
        ListLoanEquipmentComponent
    ],
    imports: [
        CommonModule,
        LoanRoutingModule,
        PrimeNgModule
    ]
})
export class LoanModule { }
