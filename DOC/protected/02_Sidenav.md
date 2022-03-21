# Protected - Sidenav

Dentro de la zona protegida requerimos de un componente que se comparte en todos los las vistas luego de estar autenticado. La idea es crear un directorio en donde se tengan todos los componentes que tengan esa misma condición. Dentro del módulo `Protected` creamos un directorio llamado `shared` y allí se almacenarán los componentes compartidos.

En el caso del componente del Sidenav, usamos el siguiente comando:

```txt
ng g c protected/shared/sidenav --skip-tests
```

## Clase del componente

El componente tiene 2 variables: la primera es un arreglo con objetos que servirán de items para nuestro menú, y una segunda variable de tipo booleana para saber si el menú está colapsado o no y determinar las clases de CSS según el caso.

Los items van a tener una interfaz especifica con la finalidad de poder tener tipado nuestro código, por lo que creamos un archivo de interfaz con el siguiente comando:

```txt
ng g i protected/shared/interfaces/item-sidenav
```

Dicha interfaz tendrá la siguiente estructura:

```ts
export interface ItemSidenav {
    icon: string,
    label: string,
    routerLink: string,
    routes?: ItemSidenav[]
}
```

Volviendo a las variables de nuestro componente, tendremos los siguiente:

```ts
...
import { ItemSidenav } from '../interfaces/item-sidenav';


...
export class SidenavComponent implements OnInit {

    public items: ItemSidenav[] = []
    public isCollapsed: boolean = false
    ...
}
```

Luego necesitamos definir sus valores, por lo que dentro del ciclo de vida `ngOnInit` establecemos su contenido. La variable `isCollapsed` toma su valor a partir de evaluar la condición de encontrar algún elemento que tenga una determinada clase dentro del template. El arreglo de `items`, tiene valores fijos según la cantidad de vistas de la aplicación.

```ts
import { ..., OnInit } from '@angular/core';


...
export class SidenavComponent implements OnInit {
    ...
    ngOnInit() {
        this.isCollapsed = document.querySelector('.is-collapsed') ? true : false

        this.items = [
            ...,
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
                    ..
                ]
            },
            ...,
        ]
    }
}
```

Por último, tenemos diferentes métodos que funcionarán dependiendo de los eventos disparados por los elementos del template, por ejemplo a través del evento `onClick`, el cual es usado en Angular como `(click)`. Hago mención especial de la función `selectToggle(index: number)`, puesto que en este caso se debe recibir el indice del elemento, con el fin de encontrar un elemento que dentro de su id contenga dicho indice.:

```ts
...
export class SidenavComponent implements OnInit {
    ...
    public expand = () => {
        var element = document.getElementById('sidenav')
        element?.classList.remove('is-collapsed')
        this.isCollapsed = false
    }

    public collapse = () => {
        var element = document.getElementById('sidenav')
        element?.classList.add('is-collapsed')
        this.isCollapsed = true
    }

    public toggle = () => {
        var element = document.getElementById('sidenav')
        element?.classList.toggle('is-collapsed')
        this.isCollapsed = !this.isCollapsed
    }

    public selectToggle = (index: number) => {
        var element = document.getElementById(`list-child-${index}`)
        var button = document.getElementById(`list-button-${index}`)
        element?.classList.toggle('select')
        button?.classList.toggle('select')
    }
}
```

## Template del componente

El template está dividido en diversas partes:

### Header

```html
<div class="sidenav" id="sidenav">
    <header class="sidenav__header header">
        <div class="header__logo">
            <img [src]="isCollapsed ? '../../../../assets/escudo.png' : '../../../../assets/logo_santoto_tunja_2022.png'"
                alt="usta">
        </div>
        <button class="sidenav__button" aria-label="Expand" (click)="toggle()">
            <span class="sidenav__button-icon">
                <i class="pi pi-chevron-left" arial-hidden="true"></i>
            </span>
        </button>
    </header>
    ...
</div>
```

### Sección de Search

```html
<div class="sidenav" id="sidenav">
    ...
    <section class="search">
        <label for="search" class="search__icon">
            <i class="pi pi-search" arial-hidden="true"></i>
        </label>
        <input type="text" class="search__input" id="search" placeholder="Search" (focus)="expand()">
    </section>
    ...
</div>
```

### Sección de navegación (Items del arreglo)

```html
<div class="sidenav" id="sidenav">
    ...
    <nav class="sidenav__nav nav">
        <ul class="nav__list">
            <li class="nav__item" *ngFor="let item of items; let i = index">
                <button [routerLink]="item.routerLink" routerLinkActive="is-active" #rla="routerLinkActive"
                    [class]="!rla ? 'nav__button is-active' : 'nav__button'" (click)="selectToggle(i)">
                    <span class="nav__icon">
                        <i [class]="item.icon" arial-hidden="true"></i>
                    </span>
                    <span class="nav__label">{{ item.label }}</span>
                    <button class="nav__item-children" [id]="'list-button-'+i" *ngIf="item.routes">
                        <i class="pi pi-chevron-down" arial-hidden="true"></i>
                    </button>
                </button>
                <ul class="nav__list list__child select" *ngIf="item.routes" [id]="'list-child-'+i">
                    <li class="nav__item" *ngFor="let item_child of item.routes; let i = index">
                        <button [routerLink]="item_child.routerLink" routerLinkActive="is-active"
                            #rla="routerLinkActive" [class]="!rla ? 'nav__button is-active' : 'nav__button'">
                            <span class="nav__icon">
                                <i [class]="item_child.icon" arial-hidden="true"></i>
                            </span>
                            <span class="nav__label">{{ item_child.label }}</span>
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
        ...
    </nav>
    ...
</div>
```

### Separador de Items

```html
<div class="sidenav" id="sidenav">
    ...
    <nav class="sidenav__nav nav">
        ...
        <div class="nav__divider"></div>
        ...
    </nav>
    ...
</div>
```

### Items manualmente establecidos

```html
<div class="sidenav" id="sidenav">
    ...
    <nav class="sidenav__nav nav">
        ...
        <ul class="nav__list">
            <li class="nav__item">
                <button class="nav__button">
                    <span class="nav__icon">
                        <i class="pi pi-sliders-h" aria-hidden="true"></i>
                    </span>
                    <span class="nav__label">Settings</span>
                </button>
            </li>
        </ul>
    </nav>
    ...
</div>
```

### Información del usuario

```html
<div class="sidenav" id="sidenav">
    ...
    <div class="sidenav__footer user">
        <button class="user__button">
            <div class="user__badge">
                <div class="user__image">
                    <i class="pi pi-user" arial-hidden="true"></i>
                </div>
            </div>

            <div class="user__text">
                <span class="user__name">Carlos Páez</span>
                <span class="user__title">Desarrollador</span>
            </div>
        </button>
    </div>
</div>
```

## Estilos del componente

Créditos: [Sidenav - Kevin D](https://codepen.io/wrecklaimer/pen/xxPMOGy?editors=0100)

```css
:root {
    --gold: rgb(199, 160, 2);
    --royal-blue: rgb(8, 22, 54);

    --primary: rgb(8, 22, 54);
    --primary-lighter: rgb(16, 36, 82);
    --primary-light: rgb(26, 48, 97);

    --secondary: rgb(200, 0, 0);

    --orange: rgb(209, 98, 18);
    
    --text-light: #8895b5;
    --text-on-primary: #fff;

    --duration: 250ms;
    --timing: ease-out;

    --icon-size: 1.25rem;
    --icon-width: 2.5rem;

    --radius-sm: .5rem;
    --radius: 1rem;

    --sidenav-gutter: 1.5rem;
    --sidenav-width: 23.5rem;

    --sticky-height: 5rem;
    --sticky-height-mini: 4rem;
}


/*! Contenedor del Sidenav ----------------------------------- */

.sidenav {
    background: var(--royal-blue);
    border-right: 2px solid var(--gold);
    color: var(--text-on-primary);
    display: flex;
    flex-flow: column nowrap;
    flex: 0 1 auto;
    height: 100vh;
    max-width: 100%;
    padding: var(--sidenav-gutter);
    transition: width var(--duration) var(--timing);
    width: var(--sidenav-width);
}
.sidenav.is-collapsed {
    width: 5.5rem;
}


/*! Header --------------------------------------------------  */

.sidenav__header {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
}


.header .sidenav__button-icon {
    width: auto;
}


/*! Contenedor del logo de la USTA --------------------------- */

.header__logo {
    display: inline-flex;
    justify-content: left;
    margin: 0;
    width: 100%;
}
.sidenav.is-collapsed .header__logo {
    justify-content: center;
}


/*! Logo de la USTA ------------------------------------------ */

.header__logo img {
    width: 85%;
    /* clip-path: inset(30px 5px 25px 10px); */
    margin: 1rem 0;
    transition: width var(--duration);
}
.sidenav.is-collapsed .header__logo img {
    clip-path: none;
    margin: 0;
    width: 4rem;
}


/*! Icono de Header ------------------------------------------ */

.header__icon {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    height: var(--icon-width);
    justify-content: center;
    width: var(--icon-width);
}
.header__icon i {
    font-size: var(--icon-size);
}


/*! Texto del Header ------------------------------------------ */

.header__text {
    display: inline-block;
    flex: 1;
    font-weight: 700;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    transition-delay: var(--duration);
    transition-duration: var(--duration);
    transition-property: opacity, transform;
    transition-timing-function: var(--timing);
    white-space: nowrap;
}
.sidenav.is-collapsed .header__text {
    opacity: 0;
    transform: translateX(1rem);
    transition-delay: 0s;
}


/*! Toggle del la propiedad collapsed ------------------------ */

.sidenav__button {
    align-items: center;
    background: var(--primary-lighter);
    border-radius: var(--radius-sm);
    border: 0;
    color: var(--text-light);
    cursor: pointer;
    display: inline-flex;
    flex-flow: row nowrap;
    flex: 0 0 auto;
    left: 100%;
    outline-offset: -2px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    transition-duration: var(--duration);
    transition: background, color;
}
.sidenav__button:active {
    color: var(--text-on-primary);
}
.sidenav__button:focus-visible {
    outline: 2px solid var(--primary-lighter);
}
.sidenav__button:focus-visible,
.sidenav__button:hover {
    background: var(--primary-lighter);
    color: var(--text-on-primary)
}
.sidenav.is-collapsed .sidenav__button {
    transform: translateX(0.8rem);
}


/*! Icono del toggle ----------------------------------------- */

.sidenav__button-icon {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    height: var(--icon-width);
    justify-content: center;
    width: var(--icon-width);
}
.sidenav__button-icon i {
    aspect-ratio: 1;
    color: var(--text-light);
    font-size: 1.5rem;
    transition-duration: .5s;
    transition-property: transform, color;
}
.sidenav__button-icon i:hover {
    color: var(--text-on-primary)
}
.sidenav.is-collapsed .sidenav__button-icon i {
    transform: rotate(180deg);
}


/*! Sección de Búsqueda -------------------------------------- */

.search {
    display: flex;
    flex-flow: row nowrap;
    margin: 1rem 0;
    position: relative;
}


/*! Icono de Búsqueda ---------------------------------------- */

.search__icon {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    height: var(--icon-width);
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: var(--icon-width);
}
.search__icon i {
    font-size: var(--icon-size);
}


/*! Input de la búsqueda ------------------------------------- */

.search__input {
    background: var(--primary-lighter);
    border-radius: var(--radius-sm);
    border: none;
    color: var(--text-on-primary);
    flex: 1 1 auto;
    height: var(--icon-width);
    min-width: 1px;
    outline-offset: -2px;
    padding: 0 var(--icon-width) 0 1rem;
    transition-duration: var(--duration);
    transition-property: background, color, padding;
}
.search__input::placeholder {
    color: var(--text-light);
    transition-duration: var(--duration);
    transition-property: color;
}
.search__input:focus {
    outline: 2px solid var(--gold); 
}
.sidenav.is-collapsed .search__input {
    color: transparent;
    padding-left: 0;
}
.sidenav.is-collapsed .search__input:not(:hover) {
    background: none;
}
.sidenav.is-collapsed .search__input::placeholder {
    color: transparent
}


/*! Navegación ------------------------------------------------ */

.sidenav__nav {
    --offset: var(--sidenav-gutter) - .125rem;
    flex: 1 1 auto;
    margin: 1rem (var(--offset) * -1) 0;
    padding: 0 var(--offset);
}
.sidenav.is-collapsed .sidenav__nav {
    width: 3.85rem;
}


/*! Contenedor de la navegación ------------------------------- */

.nav {
    --scroll-thumb: var(--text-light);
    --scroll-track: var(--primary-lighter);
    overflow: hidden;
    overflow-y: auto;
    scrollbar-color: var(--scroll-thumb) transparent;
    scrollbar-width: thin;
    transition: scrollbar-color 200ms;
}
.nav::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}
.nav::-webkit-scrollbar-track {
    background: transparent;
    transition: background 200ms;
    border-radius: var(--radius);
}
.nav::-webkit-scrollbar-thumb {
    background: var(--text-light); 
    border-radius: var(--radius);
}
.nav::-webkit-scrollbar-corner {
    background: none;
}
.nav:hover {
    --scroll-thumb: var(--text-light);
    --scroll-track: var(--primary-lighter);
    scrollbar-color: var(--scroll-thumb) var(--scroll-track);
}
.nav:hover::-webkit-scrollbar-track {
    background: var(--primary-lighter);
}
.nav:not(:hover)::-webkit-scrollbar-thumb {
    background: transparent;
}


/*! Lista de Items ------------------------------------------- */

.nav__list {
    display: flex;
    flex-flow: column nowrap;
    list-style: none;
    margin: 10px 0;
    min-width: var(--icon-width);
    padding: 0;
}
.nav__list.list__child {
    margin: 0 35px;
    transition: all var(--duration);
}
.nav__list.list__child.select,
.sidenav.is-collapsed .nav__list.list__child {
    opacity: 0;
    height: 0;
    transition: all var(--duration);
}


/*! Separador ------------------------------------------------ */

.nav__divider {
    margin: 1rem 0;
    width: 100%;
    min-width: var(--icon-width);
    padding: 0 (var(--icon-width) - var(--icon-size)) / 2;
}
.nav__divider::before {
    background: var(--primary-lighter);
    content: '';
    display: block;
    height: 1px;
}


/*! Item del menú -------------------------------------------- */

.nav__item {
    margin-top: .25rem;
    position: relative;
}
.nav__button.is-active {
    color: var(--gold);
}

/*! Botones de navegación ------------------------------------ */

.nav__button {
    align-items: center;
    background: none;
    border-radius: var(--radius-sm);
    border: 0;
    color: var(--text-light);
    cursor: pointer;
    display: inline-flex;
    flex-flow: row nowrap;
    max-width: 100%;
    outline-offset: -2px;
    overflow: hidden;
    padding: 0;
    transition-duration: var(--duration);
    transition-property: background, color;
    width: 100%;
}
.nav__button.is-active {
    color: var(--gold);
}
.nav__button:focus-visible {
    outline: 2px solid var(--primary-lighter);
}
.nav__button:focus-visible,
.nav__button:hover {
    background: var(--primary-light);
    color: var(--text-on-primary);
}
.sidenav.is-collapsed .nav__button {
    width: var(--icon-width);
}


/*! Iconos de los items de navegación ------------------------ */

.nav__icon {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    height: var(--icon-width);
    justify-content: center;
    width: var(--icon-width);
}
.nav__icon i {
    aspect-ratio: 1;
    font-size: var(--icon-size);
}


/*! Texto de los items --------------------------------------- */

.nav__label {
    display: inline-block;
    flex: 1;
    margin-right: 2.35rem;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    transition-delay: 100ms;
    transition-duration: var(--duration);
    transition-property: opacity, transform;
    transition-timing-function: var(--timing);
    white-space: nowrap;
}
.sidenav.is-collapsed .nav__label {
    opacity: 0;
    transform: translateX(1rem);
    transition-delay: 0s;
}


/*! Botón para desplegar items hijos ------------------------- */

.nav__item-children {
    align-items: center;
    background: transparent;
    border-radius: var(--border);
    border: none;
    color: var(--text-light);
    display: flex;
    height: var(--icon-width);
    justify-content: center;
    transition-duration: var(--duration);
    transition-property: background, transform;
    transition-timing-function: var(--timing);
    width: var(--icon-width);
    z-index: 10;
}
.nav__item-children:hover {
    color: var(--text-on-primary);
}

/*! Icono de despliegue -------------------------------------- */

.nav__item-children i {
    font-size: var(--icon-size);
    transition: all var(--duration);
}
.nav__item-children.select i {
    transform: rotate(180deg)
}


/*! Footer del menú ------------------------------------------ */

.sidenav__footer {
    margin-top: 1rem;
}


/*! Botón del usuario ---------------------------------------- */

.user__button {
    align-items: center;
    background: none;
    border-radius: 50vh;
    border: 0;
    color: var(--text-on-primary);
    cursor: pointer;
    display: inline-flex;
    flex-flow: row nowrap;
    max-width: 100%;
    outline-offset: -2px;
    overflow: hidden;
    padding: 0;
    transition-duration: var(--duration);
    transition-property: background, color;
    width: 100%;
}
.user__button:active {
    color: var(--text-on-primary);
}
.user__button:focus-visible {
    outline: 2px solid --primary-lighter;
}
.user__button:focus-visible,
.user__button:hover {
    background-color: var(--primary-light);
    color: var(--text-on-primary);
}


/*! Badge del botón del usuario ------------------------------ */

.user__badge {
    flex: 0 0 auto;
    height: var(--icon-width);
    padding: 2px;
    width: var(--icon-width);
}


/*! Imagen del usuario --------------------------------------- */

.user__image {
    align-items: center;
    background: #CFD8DC;
    border-radius: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}
.user__image i {
    color: black;
    font-size: 1.5rem;
}


/*! Texto del usuario ---------------------------------------- */

.user__text {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    margin-left: .5rem;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    transition-delay: 100ms;
    transition-duration: var(--duration);
    transition-property: opacity, transform;
    transition-timing-function: var(--timing);
    white-space: nowrap;
}
.sidenav.is-collapsed .user__text {
    opacity: 0;
    transform: translateX(1rem);
    transition-delay: 0s;
}


/*! Titulo del usuario --------------------------------------- */

.user__title {
    font-size: .75rem;
    color: var(--text-light);
}
```
