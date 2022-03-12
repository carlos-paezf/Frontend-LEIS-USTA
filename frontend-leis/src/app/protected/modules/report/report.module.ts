import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { GenerateComponent } from './pages/generate/generate.component';


@NgModule({
    declarations: [
        GenerateComponent
    ],
    imports: [
        CommonModule,
        ReportRoutingModule
    ]
})
export class ReportModule { }
