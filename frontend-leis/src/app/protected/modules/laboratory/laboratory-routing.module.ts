import { ListarComponent } from './pages/listar/listar.component';
import { AdministrarComponent } from './pages/administrar/administrar.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Rutas del componente de Laboratorio
 */
const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Laboratorios' },
    children: [
      {
        path: 'Administrar',
        data: { breadcrumb: 'Administrar' },
        component: AdministrarComponent,
      },
      {
        path: 'Listar',
        data: { breadcrumb: 'Listado' },
        component: ListarComponent,
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoryRoutingModule {}
