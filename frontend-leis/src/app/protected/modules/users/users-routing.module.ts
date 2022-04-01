import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';


/**
 * Rutas del componente de Usuarios
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Usuarios' },
        children: [
            {
                path: 'list-users',
                data: { breadcrumb: 'Listado de Usuarios' },
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
export class UsersRoutingModule { }
