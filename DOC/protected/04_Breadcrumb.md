# Breadcrumb

Vamos a crear un nuevo componente para el menú de tipo Breadcrumb, para lo cual usamos el siguiente comando:

```txt
ng g c protected/shared/breadcrumb --skip-tests
```

## Importación del módulo en PrimeNG

Como el menú usado es un componente de PrimeNg, debemos hacer la importación en su módulo respectivo:

```ts
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb'


@NgModule({
    exports: [
        BreadcrumbModule
    ]
})
export class PrimeNgModule { }
```

Luego, como nuestro componente de Breadcrumb está dentro del módulo Shared, debemos hacer la importación de PrimeNG dentro del mismo con el fin de poder hacer uso del mismo, pero también debemos exportar el componente del Breadcrumb con el fin de poderlo usar en cualquier otro módulo:

```ts
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
...


@NgModule({
    declarations: [
        BreadcrumbComponent
    ],
    imports: [
        ...,
        PrimeNgModule
    ],
    exports: [
        BreadcrumbComponent
    ]
})
export class SharedModule { }
```

## Routing en los módulos protegidos

Los archivo de configuración de rutas dentro de cada módulo van a presentar una pequeña variación. La idea es que tenga una propiedad-objeto llamada `data`, además de clasificar sus componentes como hijos de un path principal del módulo. Por ejemplo el archivo `dashboard-routing.module.ts` quedará de la siguiente manera:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


/**
 * Rutas hijas del módulo Dashboard
 */
const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: null },
        children: [
            {
                path: '',
                data: { breadcrumb: 'Dashboard' },
                component: DashboardComponent
            },
            {
                path: '**',
                redirectTo: '',
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
```

Hacemos lo mismo en todos los módulos de rutas de las diferentes vistas.

## Clase del componente

Nuestro componente tendrá la misión de ubicar al usuario, y darle la opción de navegar por las rutas anteriores al punto en que se encuentra.

### Items de navegación

Vamos a definir 3 variables en nuestra clase, con el fin de poder tener un manejo más personalizado de las rutas en el menú. La primera variable es una variable estática que tiene como objetivo almacenar el nombre de la propiedad que hemos puesto dentro del objeto `data` de las rutas. También tenemos una variable para la ruta de la vista de inicio, y por último un arreglo que almacena todas las rutas de la aplicación:

```ts
...
import { MenuItem } from 'primeng/api';

...
export class BreadcrumbComponent {

    static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb'
    public readonly dashboard = { icon: 'pi pi-home', url: '/dashboard' }
    public menuItems!: MenuItem[]
    ...
}
```

Lo que necesitamos hacer ahora, es inyectar las dependencias de `Router` y `ActivatedRouter`, puesto que necesitamos interceptar los eventos de la ruta que son de tipo `NavigationEnd` mediante el operador `filter` dentro del operador `pipe` (ambos de ***RxJs***), y luego suscribirnos al observable resultante. Al suscribirnos empezamos a llenar el arreglo de items del menú con los breadcrumbs retornados de la función que se encarga de crearlos a partir de las rutas activas que se proveen en el root.

```ts
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

...
export class BreadcrumbComponent {
    ...
    constructor(private _router: Router, private _activatedRoute: ActivatedRoutes) {
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.menuItems = this.createBreadcrumbs(this._activatedRoute.root));
    }
}
```

La función para crear los breadcrumbs se explica de la siguiente manera: Se reciben por parámetros las rutas activas, una url base, y un arreglo de breadcrumbs. Se va a crear una arreglo con las rutas hijas de del path activo. Si no tiene rutas hijas, entonces la función retorna los breadcrumbs actuales.

Cuando tenemos rutas hijas debemos tomar un 'pantallazo' de la ruta para mapearla y poder tomar el path de la ruta que se une mediante un slash (`/`). Si la ruta es diferente a un path vacío, la concatenamos al endpoint base que se ha ingresado por parámetro de la función. Los labels de cada breadcrumb se obtienen del string que se paso por las rutas mediante el objeto `data`. Cuando se obtiene el path y el label, se agrega el objeto al arreglo de breadcrumbs, y luego se aplica recursividad para las ruta actual en caso de que pueda tener más hijos. La función al terminar de correr las rutas hijas, retorna los breadcrumbs que se hayan generado.

```ts
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

...
export class BreadcrumbComponent {
    ...
    public createBreadcrumbs = (route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] => {
        const children: ActivatedRoute[] = route.children

        if (children.length === 0) return breadcrumbs

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')
            if (routeURL !== '') {
                url += `/${routeURL}`
            }

            const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB]
            if (label) {
                breadcrumbs.push({ label, url })
            }

            return this.createBreadcrumbs(child, url, breadcrumbs)
        }

        return breadcrumbs
    }
}
```

### Mensajes

Creo un arreglo para almacenar los mensajes que se destinan para el usuario. También requiero un contador para los mensajes que están marcados como no leídos. Se hace la inyección de dependencias de un servicio personalizado para la manipulación de mensajes (Se explica más adelante). Cuando nos suscribimos al observable de la función de obtener mensajes, los sorteamos por la fecha y los asignamos al arreglo de mensajes, Además se recorren los mensajes y se incrementa el contador en caso de que no se haya marcado como leído.

La función para sortear los mensajes está creando un nuevo arreglo a partir los mensajes que se ingresen por parámetro. Si no queremos crear un nuevo arreglo, podemos crear un pipe y hacer el sort dentro del template.

```ts
import { MsgGeneric } from '../../interfaces';
import { MessagesService } from '../../services';

...
export class BreadcrumbComponent {
    ...
    public messages!: MsgGeneric[]
    public badgeNotification: number = 0

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _msgService: MessagesService) {
        ...
        this._msgService.getMessages()
            .subscribe(msgs => {
                this.messages = this.sortMsgs(msgs)
                msgs.forEach(msg => !msg.check && (this.badgeNotification += 1))
            })
    }
    ...
    public sortMsgs = (msgs: MsgGeneric[]) => {
        return msgs.sort((a, b) => {
            if (a.date < b.date) return 1
            if (a.date > b.date) return -1
            return 0
        })
    }
}
```

### Notificación de mensajes

Nuestro menú de breadcrumbs tiene un icono-botón de alertas que se acompaña de un componente badge de PrimeNG para mostrar los mensajes no leídos. Dicho componente se debe importar de la siguiente manera en el módulo de PrimeNG:

```ts
import { NgModule } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
...


@NgModule({
    exports: [
        ...,
        BadgeModule,
    ]
})
export class PrimeNgModule { }
```

### Contenedor de mensajes

Volviendo a la clase de nuestro componente, tenemos una variables que se recibe desde el componente padre, el cual sirve para ocultar o mostrar el contenedor de los mensajes.

```ts
import { Component, Input } from '@angular/core';
...

...
export class BreadcrumbComponent {

    @Input() public showNotification!: boolean
    ...
    public togglePanelNotification = (): void => {
        this.showNotification = !this.showNotification
    }
}
```

## Template del componente

El componente tiene como base el componente de breadcrumb al que se le pasa mediante una sola vía el modelo de los items y la ruta de inicio. Luego reutilizamos el componente de Autocompletado y le pasamos la propiedad que require en caso de personalización. Tenemos 1 icono para el cual se le establece la propiedad del badge con el valor de las notificaciones no leídas, pero en caso de que no hayan mensajes no leídos, entonces, se muestra un icono sin badge. Por último tenemos el contenedor para mostrar el listado de mensajes recibidos, el cual se debe mostrar en caso de que la variable `showNotification` tenga un valor de true.

```html
<section class="breadcrumb">
    <p-breadcrumb [home]="dashboard" [model]="menuItems" id="breadcrumb"></p-breadcrumb>

    <app-input-autocomplete id="autocomplete" background="var(--primary)"></app-input-autocomplete>

    <i class="pi pi-bell notification" id="button-notification" *ngIf="badgeNotification > 0 else withoutNotification"
        pBadge [value]="badgeNotification.toString()" severity="danger" (click)="togglePanelNotification()"></i>

    <ng-template #withoutNotification>
        <i class="pi pi-bell notification" id="button-notification" (click)="togglePanelNotification()"></i>
    </ng-template>


    <app-breadcrumb-messages id="breadcrumb-messages"
        [ngClass]="showNotification ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'"
        *ngIf="showNotification" [messages]="messages" [unreadMessages]="badgeNotification"></app-breadcrumb-messages>
</section>
```

## CSS del componente

```css
.breadcrumb {
    height: var(--breadcrumb);
    border-bottom: 1.5px solid var(--gold);
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
}

#breadcrumb {
    width: 100%;
}


#autocomplete {
    position: absolute;
    top: 15%;
    right: 11rem;
    width: 300px
}


.notification {
    position: absolute;
    top: 1rem;
    right: 8rem;
    font-size: 25px;
    cursor: pointer;
    user-select: none;
}


#panel__notifications {
    position: fixed;
    top: 0;
    right: 0;
    height: 700px;
    width: 700px;
}
```
