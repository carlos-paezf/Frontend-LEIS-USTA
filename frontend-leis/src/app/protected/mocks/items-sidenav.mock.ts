import { ItemsMenu } from '../interfaces';

export const ITEMS_SIDENAV: ItemsMenu[] = [
  {
    id: 1,
    icon: 'pi pi-home',
    label: 'Inicio',
    routerLink: '/dashboard',
  },
  {
    id: 2,
    icon: 'pi pi-desktop',
    label: 'Equipos',
    routerLink: '/equipment/list-equipment',
    routes: [
      {
        id: 2.1,
        icon: 'bi bi-pc-display',
        label: 'Listado de Equipos',
        routerLink: '/equipment/list-equipment',
      },
      {
        id: 2.2,
        icon: 'pi pi-book',
        label: 'Documentos Anexos',
        routerLink: '/equipment/technical-data-sheets',
      },
      {
        id: 2.3,
        icon: 'bi bi-clipboard2-check',
        label: 'Administrar Equipos',
        routerLink: '/equipment/manage-users',
      },
    ],
  },

  {
    id: 3,
    icon: 'pi pi-users',
    label: 'Usuarios',
    routerLink: '/users',
    routes: [
      {
        id: 3.1,
        icon: 'bi bi-person-lines-fill',
        label: 'Listado de Usuarios',
        routerLink: '/users/list-users',
      },
      {
        id: 3.2,
        icon: 'pi pi-user-edit',
        label: 'Crear rol',
        routerLink: '/users/create-roles',
      },
      {
        id: 3.3,
        icon: 'bi bi-person-rolodex',
        label: 'Asignación de Roles',
        routerLink: '/users/assing-roles',
      },
    ],
  },

  {
    id: 4,
    icon: 'pi pi-comments',
    label: 'Préstamos',
    routerLink: '/loan',
    routes: [
      {
        id: 4.1,
        icon: 'pi pi-users',
        label: 'Préstamos por Usuario',
        routerLink: '/loan/loan-users',
      },
      {
        id: 4.2,
        icon: 'bi bi-wrench-adjustable-circle',
        label: 'Préstamos por Equipo',
        routerLink: '/loan/loan-equipment',
      },
      {
        id: 4.3,
        icon: 'bi bi-file-earmark-person-fill',
        label: 'Préstamos',
        routerLink: '/loan/loan-list',
      },
      {
        id: 4.4,
        icon: 'bi bi-journal-arrow-down',
        label: 'Crear Prestamo',
        routerLink: '/loan/loan-create',
      },
    ],
  },
  {
    id: 5,
    icon: 'pi pi-building',
    label: 'Laboratorios',
    routerLink: '/laboratory/Administrar',
    routes: [
      {
        id: 5.1,
        icon: 'bi bi-clipboard2-check',
        label: 'Administrar ',
        routerLink: '/laboratory/Administrar',
      },
      {
        id: 5.2,
        icon: 'pi pi-book',
        label: 'Listado de Laboratorios',
        routerLink: '/laboratory/Listar',
      },
    ],
  },
  {
    id: 6,
    icon: 'bi bi-tools',
    label: 'Herramientas y Experimentos',
    routerLink: '/tool-experiment',
    routes: [
      {
        id: 6.1,
        icon: 'pi pi-box',
        label: 'Inventario',
        routerLink: '/tool-experiment',
      },
      {
        id: 6.2,
        icon: 'pi pi-book',
        label: 'Documentación',
        routerLink: '/document',
      },
    ],
  },
  {
    id: 7,
    icon: 'pi pi-chart-bar',
    label: 'Estadísticas',
    routerLink: '/statistics',
    routes: [
      {
        id: 7.1,
        icon: 'pi pi-box',
        label: 'Estadisticas Generales',
        routerLink: '/statistics/general-statistics',
      },
      {
        id: 7.2,
        icon: 'pi pi-box',
        label: 'Estadisticas individuales',
        routerLink: '/statistics/individual-statistics',
      },
    ],
  },
  {
    id: 8,
    icon: 'bi bi-envelope-paper',
    label: 'Reportes',
    routerLink: '/report',
  },
];
