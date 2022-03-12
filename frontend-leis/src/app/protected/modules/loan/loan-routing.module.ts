import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';


/**
 * Rutas del componente de Préstamos
 */
const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: '**',
        redirectTo: '',
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoanRoutingModule { }
