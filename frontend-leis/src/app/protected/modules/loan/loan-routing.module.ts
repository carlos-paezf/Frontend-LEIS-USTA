import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLoanComponent } from './pages/create-loan/create-loan.component';
import { ListLoanEquipmentComponent } from './pages/list-loan-equipment/list-loan-equipment.component';
import { ListLoansComponent } from './pages/list-loans/list-loans.component';
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
                path: 'loan-list',
                data: { breadcrumb: 'Préstamos' },
                component: ListLoansComponent
            },
            {
                path: 'loan-create',
                data: { breadcrumb: 'Préstamos' },
                component: CreateLoanComponent
            },
            {
                path: 'loan-edit/:id_prestamo',
                data: { breadcrumb: 'Préstamos' },
                component: CreateLoanComponent
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
