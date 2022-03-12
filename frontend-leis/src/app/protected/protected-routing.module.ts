import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';


/**
 * Carga de las rutas hijas para el módulo Protected
 */
const protectedRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'equipment',
                loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)
            },
            {
                path: 'loan',
                loadChildren: () => import('./modules/loan/loan.module').then(m => m.LoanModule)
            },
            {
                path: 'laboratory',
                loadChildren: () => import('./modules/laboratory/laboratory.module').then(m => m.LaboratoryModule)
            },
            {
                path: 'tool-experiment',
                loadChildren: () => import('./modules/tool-experiment/tool-experiment.module').then(m => m.ToolExperimentModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'statistics',
                loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: ''
    }
]


@NgModule({
    imports: [RouterModule.forChild(protectedRoutes)],
    exports: [RouterModule]
})
export class ProtectedRoutingModule { }
