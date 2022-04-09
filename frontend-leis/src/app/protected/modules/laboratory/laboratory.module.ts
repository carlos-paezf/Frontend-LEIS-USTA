import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { ListComponent } from './pages/list/list.component';
import { SantoDomingoComponent } from './pages/santo-domingo/santo-domingo.component';


@NgModule({
    declarations: [
        ListComponent,
        SantoDomingoComponent
    ],
    imports: [
        CommonModule,
        LaboratoryRoutingModule
    ]
})
export class LaboratoryModule { }
