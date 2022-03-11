import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/**
 * Carga de las rutas mediante LazyLoad
 */
const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
