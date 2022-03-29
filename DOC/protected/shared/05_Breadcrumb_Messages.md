# Breadcrumb Messages

El componente de Breadcrumb se puede considerar como el componente padre de este nuevo componente. Para crearlo usamos el siguiente comando:

```txt
ng g c protected/shared/breadcrumb-messages --skip-tests
```

## Clase del componente

Este componente aparece cuando se quiere desplegar la lista de mensajes recibidos. Lo que vamos a recibir dentro de la clase del componente serán 2 variables: La primera será la cantidad de mensajes no leídas, y un arreglo con los mensajes.

```ts
import { Component, Input } from '@angular/core';
import { MsgGeneric } from '../../interfaces';


@Component({
    selector: 'app-breadcrumb-messages',
    templateUrl: './breadcrumb-messages.component.html',
    styleUrls: ['./breadcrumb-messages.component.css']
})
export class BreadcrumbMessagesComponent {

    @Input() unreadMessages!: number
    @Input() messages!: MsgGeneric[]

}
```

## Template del componente

Las variables que recibimos desde el componente padre, ahora la vamos a pasar al componente hijo. Lo ideal es poder gestionar después este problema mediante una gestión de estados globales, como se hace con reducer.

```html
<div class="breadcrumb__messages" id="breadcrum-messages">
    <app-card-info [title]="'Notificaciones'" [messages]="messages" [unreadMessages]="unreadMessages" [idCard]="'0'">
    </app-card-info>
</div>
```

## CSS del componente

```css
.breadcrumb__messages {
    border-radius: var(--radius);
    box-shadow: -5px 5px 20px var(--primary-light);
    height: 800px;
    padding: 0;
    position: fixed;
    right: 1rem;
    top: 4rem;
    width: 700px;
    z-index: 50;
}

.breadcrumb__messages::before {
    content: '';
    position: absolute;
    top: -1rem;
    right: 21px;
    background: var(--text-on-primary);
    border: 1px solid var(--primary);
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
}
```
