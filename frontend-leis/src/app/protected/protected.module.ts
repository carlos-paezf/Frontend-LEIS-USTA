import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
	declarations: [
		MainComponent
	],
	imports: [
		CommonModule,
		ProtectedRoutingModule,
		SharedModule
	]
})
export class ProtectedModule { }
