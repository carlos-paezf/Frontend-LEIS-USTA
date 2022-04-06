import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { ListComponent } from './pages/list/list.component';
import { LoanRequestComponent } from './pages/loan-request/loan-request.component';


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
                path: 'request',
                data: { breadcrumb: 'Solicitud de préstamos' },
                component: LoanRequestComponent
            },
            {
                path: 'loan-equipment',
                data: { breadcrumb: 'Préstamos Equipos' },
                component: ListLoanEquipmentComponent
            },
            {
                path: '**',
                redirectTo: 'loan-users',
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoanRoutingModule { }
