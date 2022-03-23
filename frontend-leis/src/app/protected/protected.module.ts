import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { InputAutocompleteComponent } from './shared/sidenav/input-autocomplete/input-autocomplete.component';



@NgModule({
	declarations: [
		MainComponent,
		SidenavComponent,
		InputAutocompleteComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ProtectedRoutingModule,
		MaterialDesignModule
	]
})
export class ProtectedModule { }
