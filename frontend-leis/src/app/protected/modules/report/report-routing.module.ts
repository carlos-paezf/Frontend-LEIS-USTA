import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './pages/generate/generate.component';


/**
 * Rutas del componente de Reportes
 */
const routes: Routes = [
    {
        path: '',
        component: GenerateComponent
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
export class ReportRoutingModule { }
