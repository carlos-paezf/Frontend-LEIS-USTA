# Protected - Main

El componente `src/protected/pages/main` se encarga de albergar el `<router-outlet></router-outlet>` de las rutas del módulo protegido, por lo tanto se puede considerar el contenedor de las vistas de dicho módulo. Además cuenta con una Sidenav para la identificación de la institución por su logo, y la navegación dentro de la aplicación.

La clase del componente no va a tener nada. Lo importante es el uso del selector del menú dentro del template.

## Clase del componente

Mediante el decorador `@HostListener` añadimos funcionalidades a diversos eventos del documento a partir del id de los componentes a manipular.

```ts
import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public isCollapsedSidenav: boolean = true
    public showTooltipUser: boolean = false
    public showBreadcrumbMessages: boolean = false


    ngOnInit() {
        this.isCollapsedSidenav = document.querySelector('.is-collapsed') ? true : false
    }


    @HostListener('click', ['$event']) onWindowClick = ($event: any): void => {
        var sidenav = document.getElementById('sidenav')
        var toggleSidenav = document.getElementById('toggle-sidenav')
        var user_button = document.getElementById('user-button')
        var button_notification = document.getElementById('button-notification')
        var breadcrumb_messages = document.getElementById('breadcrumb-messages')

        if (sidenav?.contains($event.target) && !toggleSidenav?.contains($event.target)) {
            sidenav?.classList.remove('is-collapsed')
            this.isCollapsedSidenav = false
        } else if (!sidenav?.contains($event.target)) {
            sidenav?.classList.add('is-collapsed')
            this.isCollapsedSidenav = true
        }


        if (this.isCollapsedSidenav && toggleSidenav?.contains($event.target)) {
            sidenav?.classList.remove('is-collapsed')
            this.isCollapsedSidenav = false
        } else if (!this.isCollapsedSidenav && toggleSidenav?.contains($event.target)) {
            sidenav?.classList.add('is-collapsed')
            this.isCollapsedSidenav = true
        }


        if (user_button?.contains($event.target)) {
            this.showTooltipUser = true
        } else {
            this.showTooltipUser = false
        }

        if (button_notification?.contains($event.target) || breadcrumb_messages?.contains($event.target)) {
            this.showBreadcrumbMessages = true
        } else {
            this.showBreadcrumbMessages = false
        }
    }
}

```

## Template del componente

```html
<div class="app">
    <app-sidenav [isCollapsed]="isCollapsedSidenav" [showTooltipUser]="showTooltipUser"></app-sidenav>

    <div class="content">
        <app-breadcrumb [showNotification]="showBreadcrumbMessages"></app-breadcrumb>
        <router-outlet></router-outlet>
    </div>
</div>
```

## Estilos del componente

```css
.app {
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    background: #fff;
    width: 100vw;
    max-width: 100%;
    min-width: var(--sidenav-width);
    box-shadow: rgba(#000, 0.1) 0 7px 29px 0;
    position: relative;
}


.content {
    flex: 1;
    margin-left: 10px;
    margin-left: var(--sidenav-mini-width);
    background: var(--main-background);
}
```
