import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';

import { AdministrarComponent } from './pages/administrar/administrar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdministrarComponent, ListarComponent],
  imports: [CommonModule, LaboratoryRoutingModule, ReactiveFormsModule],
})
export class LaboratoryModule {}
