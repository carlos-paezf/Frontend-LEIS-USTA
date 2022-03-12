import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { GlobalsComponent } from './pages/globals/globals.component';


@NgModule({
    declarations: [
        GlobalsComponent
    ],
    imports: [
        CommonModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule { }
