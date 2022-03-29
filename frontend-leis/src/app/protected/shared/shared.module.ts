import { NgModule } from '@angular/core';
import { BreadcrumbMessagesComponent } from './breadcrumb-messages/breadcrumb-messages.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardInfoContentComponent } from './card-info-content/card-info-content.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TitleComponent } from './title/title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


@NgModule({
	declarations: [
		BreadcrumbComponent,
		BreadcrumbMessagesComponent,
		CardInfoComponent,
		CardInfoContentComponent,
		InputAutocompleteComponent,
		SidenavComponent,
		TitleComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		MaterialDesignModule,
		PrimeNgModule
	],
	exports: [
		BreadcrumbComponent,
		BreadcrumbMessagesComponent,
		CardInfoComponent,
		CardInfoContentComponent,
		InputAutocompleteComponent,
		SidenavComponent,
		TitleComponent,
	]
})
export class SharedModule { }