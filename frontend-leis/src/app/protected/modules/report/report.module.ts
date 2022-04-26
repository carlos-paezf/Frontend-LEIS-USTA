import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReportRoutingModule } from './report-routing.module';
import { GenerateComponent } from './pages/generate/generate.component';


@NgModule({
    declarations: [
        GenerateComponent
    ],
    imports: [
        CommonModule,
        ReportRoutingModule,
        PrimeNgModule
    ]
})
export class ReportModule { }
