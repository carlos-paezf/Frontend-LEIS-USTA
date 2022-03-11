import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


/**
 * Rutas hijas del módulo Auth
 */
const routesAuth: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', redirectTo: 'login' },
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routesAuth)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
