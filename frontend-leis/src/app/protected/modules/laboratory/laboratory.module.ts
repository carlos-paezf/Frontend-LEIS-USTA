import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';

import { AdministrarComponent } from './pages/administrar/administrar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
  declarations: [AdministrarComponent, ListarComponent],

  imports: [CommonModule, LaboratoryRoutingModule, ReactiveFormsModule, TableModule ],

})
export class LaboratoryModule {}
