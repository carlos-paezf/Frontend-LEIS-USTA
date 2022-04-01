import { AssignRolesComponent } from './pages/assign-roles/assign-roles.component';
import { NgModule, Component } from '@angular/core';
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
                path: 'assing-roles',
                data: { breadcrumb: 'Asignación de roles' },
                component: AssignRolesComponent
            },

            {
                path: '**',
                redirectTo: 'list-users',
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
