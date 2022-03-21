import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
	declarations: [
		MainComponent,
		SidenavComponent
	],
	imports: [
		CommonModule,
		ProtectedRoutingModule,
		PrimeNgModule
	]
})
export class ProtectedModule { }
