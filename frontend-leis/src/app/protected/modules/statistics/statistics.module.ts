import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { GlobalsComponent } from './pages/globals/globals.component';
import { IndividualStatisticsComponent } from './pages/individual-statistics/individual-statistics.component';
import { MiniCardStatisticsComponent } from './components/mini-card-statistics/mini-card-statistics.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        GlobalsComponent,
        IndividualStatisticsComponent,
        MiniCardStatisticsComponent
    ],
    imports: [
        CommonModule,
        StatisticsRoutingModule,
        SharedModule
    ]
})
export class StatisticsModule { }
