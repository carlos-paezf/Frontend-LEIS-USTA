import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';


/**
 * Rutas del componente de Laboratorio
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Laboratorios' },
        children: [
            {
                path: '',
                data: { breadcrumb: 'Listado de Laboratorios' },
                component: ListComponent
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
export class LaboratoryRoutingModule { }
