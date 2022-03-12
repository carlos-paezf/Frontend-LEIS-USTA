import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolExperimentRoutingModule } from './tool-experiment-routing.module';
import { ListComponent } from './pages/list/list.component';


@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        ToolExperimentRoutingModule
    ]
})
export class ToolExperimentModule { }
