import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';



@NgModule({
	declarations: [
		MainComponent
	],
	imports: [
		CommonModule,
		ProtectedRoutingModule
	]
})
export class ProtectedModule { }
