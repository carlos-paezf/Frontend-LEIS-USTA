import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { TechnicalDataSheetsComponent } from './pages/technical-data-sheets/technical-data-sheets.component';


/**
 * Rutas del componente de Equipos
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Equipos' },
        children: [
            {
                path: 'list-equipment',
                data: { breadcrumb: 'Listado de Equipos' },
                component: ListComponent
            },
            {
              path: 'technical-data-sheets',
              data: { breadcrumb: 'Ficha Técnica' },
              component: TechnicalDataSheetsComponent
            },
            {
              path: 'manage-users',
              data: { breadcrumb: 'Administrar Usuarios' },
              component: ManageUsersComponent
            },
            {
                path: '**',
                redirectTo: '',
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipmentRoutingModule { }
