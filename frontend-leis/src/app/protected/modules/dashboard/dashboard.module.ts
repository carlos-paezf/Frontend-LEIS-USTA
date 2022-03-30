import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardIconsComponent } from './components/card-icons/card-icons.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        DashboardComponent,
        CardIconsComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
})
export class DashboardModule { }
