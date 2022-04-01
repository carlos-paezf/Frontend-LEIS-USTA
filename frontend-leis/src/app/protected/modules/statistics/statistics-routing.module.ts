import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralEquipmentComponent } from './general-equipment/general-equipment.component';
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
                path: 'general-statistics',
                data: { breadcrumb: 'Estadísticas Generales' },
                component: GeneralEquipmentComponent
            },
            {
                path: 'individual-statistics',
                data: { breadcrumb: 'Estadísticas Individuales' },
                component: IndividualStatisticsComponent
            },
            {
                path: '**',
                redirectTo: 'general-statistics',
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule { }
