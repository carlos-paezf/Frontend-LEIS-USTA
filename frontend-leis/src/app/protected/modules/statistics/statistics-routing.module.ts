import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralEquipmentComponent } from './general-equipment/general-equipment.component';
import { GlobalsComponent } from './pages/globals/globals.component';


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
                data: { breadcrumb: 'Estadísticas Individuales' },
                component: GlobalsComponent
            },
            {
              path: 'statistics-general',
              data: { breadcrumb: 'Estadísticas Generales' },
              component: GeneralEquipmentComponent
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
