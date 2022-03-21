import { Component, OnInit } from '@angular/core';
import { ItemSidenav } from '../interfaces/item-sidenav';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    public items: ItemSidenav[] = []
    public isCollapsed: boolean = false


    constructor() { }


    ngOnInit() {
        this.isCollapsed = document.querySelector('.is-collapsed') ? true : false

        this.items = [
            {
                icon: 'pi pi-home',
                label: 'Dashboard',
                routerLink: '/dashboard'
            },
            {
                icon: 'pi pi-desktop',
                label: 'Equipos',
                routerLink: '/equipment',
                routes: [
                    {
                        icon: 'pi pi-box',
                        label: 'Inventario',
                        routerLink: '/equipment',
                    },
                    {
                        icon: 'pi pi-book',
                        label: 'Documentación',
                        routerLink: '/equipment',
                    }
                ]
            },
            {
                icon: 'pi pi-comments',
                label: 'Préstamos',
                routerLink: '/loan'
            },
            {
                icon: 'pi pi-building',
                label: 'Laboratorios',
                routerLink: '/laboratory'
            },
            {
                icon: 'pi pi-exclamation-triangle',
                label: 'Herramientas y Experimentos',
                routerLink: '/tool-experiment',
                routes: [
                    {
                        icon: 'pi pi-box',
                        label: 'Inventario',
                        routerLink: '/tool-experiment',
                    },
                    {
                        icon: 'pi pi-book',
                        label: 'Documentación',
                        routerLink: '/tool-experiment',
                    }
                ]
            },
            {
                icon: 'pi pi-chart-bar',
                label: 'Estadísticas',
                routerLink: '/statistics'
            },
            {
                icon: 'pi pi-book',
                label: 'Reportes',
                routerLink: '/report'
            },
            {
                icon: 'pi pi-users',
                label: 'Usuarios',
                routerLink: '/users'
            },
        ]
    }


    /**
     * It removes the class is-collapsed from the sidenav element.
     */
    public expand = () => {
        var element = document.getElementById('sidenav')
        element?.classList.remove('is-collapsed')
        this.isCollapsed = false
    }


    /**
     * Add the class 'is-collapsed' to the element with the id 'sidenav'
     */
    public collapse = () => {
        var element = document.getElementById('sidenav')
        element?.classList.add('is-collapsed')
        this.isCollapsed = true
    }


    /**
     * Toggle the sidenav by adding or removing the class is-collapsed
     */
    public toggle = () => {
        var element = document.getElementById('sidenav')
        element?.classList.toggle('is-collapsed')
        this.isCollapsed = !this.isCollapsed
    }


    /**
     * It toggles the class of the element with the id `list-child-` and the button with the id `list-button-`.
     * @param {number} index - The index of the list item that was clicked.
     */
    public selectToggle = (index: number) => {
        var element = document.getElementById(`list-child-${index}`)
        var button = document.getElementById(`list-button-${index}`)
        element?.classList.toggle('select')
        button?.classList.toggle('select')
    }
}