import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';


/**
 * Rutas del componente de Herramientas y Experimentos
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
export class ToolExperimentRoutingModule { }
