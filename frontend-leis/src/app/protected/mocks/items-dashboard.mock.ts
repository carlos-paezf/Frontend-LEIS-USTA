import { ItemsMenu } from "../interfaces";


export const ITEMS_DASHBOARD: ItemsMenu[] = [
    {
        id: 1,
        icon: 'pi pi-desktop',
        label: 'Equipos',
        routerLink: '/equipment/list-equipment',
        color: '#ff0f08'
    },
    {
        id: 2,
        icon: 'pi pi-comments',
        label: 'Préstamos',
        routerLink: '/loan',
        color: '#e88049'
    },
    {
        id: 3,
        icon: 'pi pi-building',
        label: 'Laboratorios',
        routerLink: '/laboratory',
        color: '#fc9f00'
    },
    {
        id: 4,
        icon: 'bi bi-tools',
        label: 'Herramientas y Experimentos',
        routerLink: '/tool-experiment',
        color: '#f4d000'
    },
    {
        id: 5,
        icon: 'pi pi-chart-bar',
        label: 'Estadísticas',
        routerLink: '/statistics',
        color: '#bb3448'
    },
    {
        id: 6,
        icon: 'pi pi-book',
        label: 'Reportes',
        routerLink: '/report',
        color: '#5c54b4'
    },
    {
        id: 7,
        icon: 'pi pi-users',
        label: 'Usuarios',
        routerLink: '/users',
        color: '#ae7efc'
    },
]
