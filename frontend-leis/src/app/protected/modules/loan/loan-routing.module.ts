import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { ListComponent } from './pages/list/list.component';


/**
 * Rutas del componente de Préstamos
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Préstamos' },
        children: [
            {
                path: 'loan-users',
                data: { breadcrumb: 'Préstamos Usuarios' },
                component: ListComponent
            },
            {
                path: 'loan-equipment',
                data: { breadcrumb: 'Préstamos Equipos' },
                component: ListLoanEquipmentComponent
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
export class LoanRoutingModule { }
