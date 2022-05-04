import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReportRoutingModule } from './report-routing.module';
import { GenerateComponent } from './pages/generate/generate.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';

@NgModule({
    declarations: [
        GenerateComponent
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        PrimeNgModule,
        SharedModule,
        MaterialDesignModule
    ]
})
export class ReportModule { }
