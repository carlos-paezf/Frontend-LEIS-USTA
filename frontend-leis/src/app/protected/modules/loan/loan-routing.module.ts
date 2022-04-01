import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
                path: '',
                data: { breadcrumb: 'Listado de Préstamos' },
                component: ListComponent
            },
            {
                path:'request',
                data:{breadcrumb:'Solitud de prestamos'},
                component: LoanRequestComponent
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
