import { ItemsMenu } from "../interfaces";

export const ITEMS_SIDENAV: ItemsMenu[] = [
    {
        id: 1,
        icon: 'pi pi-home',
        label: 'Inicio',
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
                label: 'Listar de Equipos',
                routerLink: '/equipment/list-equipment',
            },
            {
                id: 2.2,
                icon: 'pi pi-book',
                label: 'Documentación',
                routerLink: '/equipment/technical-data-sheets',
            },
            {
              id: 2.3,
              icon: 'bi bi-clipboard2-check',
              label: 'Administrar Equipos',
              routerLink: '/equipment/manage-users',
          }
        ]
    },
    {
        id: 3,
        icon: 'pi pi-comments',
        label: 'Préstamos',
        routerLink: '/loan/loan-users',
        routes: [
          {
              id: 3.1,
              icon: 'bi bi-clock-history',
              label: 'Prestamo Usuarios',
              routerLink: '/loan/loan-users',
          },
          {
              id: 3.2,
              icon: 'bi bi-laptop',
              label: 'Prestamo Equipos',
              routerLink: '/loan/loan-equipment',
          }
      ]
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
        routerLink: '/statistics',
        routes: [
          {
              id: 6.1,
              icon: 'pi pi-box',
              label: 'Estadisticas individuales',
              routerLink: '/statistics/statistics-individual',
          },
          {
            id: 6.2,
            icon: 'pi pi-box',
            label: 'Estadisticas Generales',
            routerLink: '/statistics/statistics-general',
          }
        ]
    },
    {
        id: 7,
        icon: 'bi bi-envelope-paper',
        label: 'Reportes',
        routerLink: '/report'
    },
    {
        id: 8,
        icon: 'pi pi-users',
        label: 'Usuarios',
        routerLink: '/users',
        routes: [
          {
              id: 8.1,
              icon: 'bi bi-person-lines-fill',
              label: 'Listado de Usuarios',
              routerLink: '/users/list-users',
          },
          {
              id: 8.2,
              icon: 'bi bi-person-rolodex',
              label: 'Asignación de Roles',
              routerLink: '/users/assing-roles',
          }
      ]
    },
]
