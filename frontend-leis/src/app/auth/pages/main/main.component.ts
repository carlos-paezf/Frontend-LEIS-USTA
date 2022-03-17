import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.css' ]
})
export class MainComponent {
    public items = [
        {
            label: 'Iniciar Sesión',
            routerLink: '/auth/login'
        },
        {
            label: 'Crear Cuenta',
            routerLink: '/auth/register'
        }
    ]
}
