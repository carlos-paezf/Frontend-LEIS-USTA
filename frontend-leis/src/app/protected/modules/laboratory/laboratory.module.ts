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
<<<<<<< HEAD
  imports: [CommonModule, LaboratoryRoutingModule, ReactiveFormsModule, TableModule ],
=======
  imports: [CommonModule, LaboratoryRoutingModule, ReactiveFormsModule,PrimeNgModule],
>>>>>>> fbb96af6d12554b7d6c5733859fbdc32fe63c538
})
export class LaboratoryModule {}
