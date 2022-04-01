import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalsComponent } from './pages/globals/globals.component';
import { IndividualStatisticsComponent } from './pages/individual-statistics/individual-statistics.component';


/**
 * Rutas del componente de Estadísticas
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Estadísticas' },
        children: [
            {
                path: '',
                data: { breadcrumb: 'Estadísticas Globales' },
                component: GlobalsComponent
            },
            {
                path: 'individual-statistics',
                data: { breadcrumb: 'Estadísticas Individuales' },
                component: IndividualStatisticsComponent
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
export class StatisticsRoutingModule { }
