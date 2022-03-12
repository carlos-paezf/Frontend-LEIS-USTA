import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { ListComponent } from './pages/list/list.component';


@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        LaboratoryRoutingModule
    ]
})
export class LaboratoryModule { }
