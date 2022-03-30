import { ItemsMenu } from "../interfaces";

export const ITEMS_SIDENAV: ItemsMenu[] = [
    {
        id: 1,
        icon: 'pi pi-home',
        label: 'Dashboard',
        routerLink: '/dashboard'
    },
    {
        id: 2,
        icon: 'pi pi-desktop',
        label: 'Equipos',
        routerLink: '/equipment',
        routes: [
            {
                id: 2.1,
                icon: 'pi pi-prime',
                label: 'Administración de Equipos',
                routerLink: '/equipment/admin-equipment',
            },
            {
                id: 2.2,
                icon: 'pi pi-book',
                label: 'Documentación',
                routerLink: '/equipment',
            }
        ]
    },
    {
        id: 3,
        icon: 'pi pi-comments',
        label: 'Préstamos',
        routerLink: '/loan'
    },
    {
        id: 4,
        icon: 'pi pi-building',
        label: 'Laboratorios',
        routerLink: '/laboratory'
    },
    {
        id: 5,
        icon: 'pi pi-exclamation-triangle',
        label: 'Herramientas y Experimentos',
        routerLink: '/tool-experiment',
        routes: [
            {
                id: 5.1,
                icon: 'pi pi-box',
                label: 'Inventario',
                routerLink: '/tool-experiment',
            },
            {
                id: 5.2,
                icon: 'pi pi-book',
                label: 'Documentación',
                routerLink: '/tool-experiment',
            }
        ]
    },
    {
        id: 6,
        icon: 'pi pi-chart-bar',
        label: 'Estadísticas',
        routerLink: '/statistics'
    },
    {
        id: 7,
        icon: 'pi pi-book',
        label: 'Reportes',
        routerLink: '/report'
    },
    {
        id: 8,
        icon: 'pi pi-users',
        label: 'Usuarios',
        routerLink: '/users'
    },
]