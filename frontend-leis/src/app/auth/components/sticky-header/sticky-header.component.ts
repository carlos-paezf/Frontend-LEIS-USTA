import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-sticky-header',
    templateUrl: './sticky-header.component.html',
    styleUrls: ['./sticky-header.component.css']
})
export class StickyHeaderComponent implements OnInit {
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

    public enableSticky: boolean = false


    ngOnInit(): void {
        this.stickyMenu()
    }


    /**
     * If the user scrolls down more than 10 pixels, the sticky menu will be enabled
     */
    stickyMenu = () => {
        window.onscroll = () => {
            console.log(window.scrollY)
            if (window.scrollY > 10) {
                this.enableSticky = true
            } else {
                this.enableSticky = false
            }
        }
    }
}
