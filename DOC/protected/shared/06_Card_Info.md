# Card Info

Vamos a crear un nuevo componente para poder administrar el container donde tenemos las tarjetas con los mensajes. Usamos el siguiente comando:

```txt
ng g c protected/shared/card-info --skip-tests
```

## Clase del Componente

Nuestro componente recibe por medio del decorador `@Input` 4 variables desde el componente padre. Recibe el titulo, el arreglo de mensajes, la cantidad de mensajes no leídos y el id de la tarjeta para usarlo en el template. Dentro del template del componente tenemos un botón para hacer scroll-up, pero requerimos de un identificador único, para lo cual hacemos un template string y combinarlo con el id que se le pasa desde el componente padre.

También hacemos la inyección de dependencias para el manejo de las propiedades del documento. Por ejemplo, mediante el decorador `@HostListener` añadimos funcionalidad cuando se le hace scroll al componente, en este caso, que después de cierta cantidad de scroll, aparezca el botón para hacer scroll-up.

La función de `scrollTop` se encarga de setear el scroll del componente a 0.

```ts
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input } from '@angular/core';
import { MsgGeneric } from 'src/app/protected/interfaces';


@Component({
    selector: 'app-card-info',
    templateUrl: './card-info.component.html',
    styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent {

    @Input() public title!: string
    @Input() public messages!: MsgGeneric[]
    @Input() public unreadMessages: number = 0
    @Input() public idCard!: string

    public idButton: string = `button-${this.idCard}`
    public showButton: boolean = false 

    constructor(@Inject(DOCUMENT) private _document: Document) { }

    @HostListener('scroll', ['$event']) onWindowScroll = (): void => {
        this.showButton = (this._document.getElementById(this.idCard)!.scrollTop > 1000) ? true : false
    }

    public onScrollTop = (): void => {
        var element = document.getElementById(this.idCard) 
        element!.scrollTop = 0
    }
}
```

## Template del componente

En nuestro template tenemos la interpolación del titulo, la cantidad de mensajes no leídos, y el contenedor con el recorrido de todas los mensajes.

```html
<div class="card__info">
    <header class="card__header">
        <h5 class="card__title">{{ title }}</h5>
        <small class="card__unread">{{ unreadMessages }} mensajes no leídos</small>
    </header>
    
    <div class="card__messages" (scroll)="onWindowScroll()" [id]="idCard">
        <app-card-info-content *ngFor="let msg of messages" [msg]="msg"></app-card-info-content>

        <button class="btn" [ngClass]="showButton ? 'btn__up animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'" *ngIf="showButton" (click)="onScrollTop()" >
            <i class="pi pi-arrow-up"></i>
        </button>
    </div>
</div>
```

## CSS del componente

```css
/*! Contenedor de las notificaciones ----------------------------------------- */

.card__info {
    background: var(--text-on-primary);
    border-radius: var(--radius);
    color: var(--primary);
    flex: 1 1 auto;
    width: 700px;
    height: 800px;
    position: relative;
}



/*! Cabecera del titulo ------------------------------------------------------- */

.card__header {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 25px 40px 10px 40px;
    width: 100%;
}


/*! Titulo -------------------------------------------------------------------- */

.card__title {
    font-size: 22.5px;
}


/*! Mensajes no leídos -------------------------------------------------------- */

.card__unread {
    color: var(--orange);
}



/*! Contenedor de las tarjetas por mensaje ------------------------------------ */

.card__messages {
    --scroll-thumb: var(--primary-lighter);
    --scroll-track: var(--text-light);
    background: rgb(240, 239, 239);
    border-radius: var(--radius-sm);
    display: flex;
    flex-flow: column nowrap;
    height: 85%;
    justify-content: flex-start;
    margin: 20px;
    overflow-y: auto;
    padding: 15px;
    scroll-behavior: smooth;
    scrollbar-color: var(--scroll-thumb) transparent;
    scrollbar-width: thin;
    transition: scrollbar-color 200ms;
}
.card__messages::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}
.card__messages::-webkit-scrollbar-track {
    background: var(--text-light);
    border-radius: var(--radius);
    transition: background 200ms;
}
.card__messages::-webkit-scrollbar-thumb {
    background: var(--primary); 
    border-radius: var(--radius);
}
.card__messages::-webkit-scrollbar-corner {
    background: none;
}
.card__messages:hover {
    --scroll-thumb: var(--primary-lighter);
    --scroll-track: var(--text-light);
    scrollbar-color: var(--scroll-thumb) var(--scroll-track);
}
.card__messages:hover::-webkit-scrollbar-track {
    background: var(--text-light);
}



/*! Botón para hacer scroll Up en los mensajes -------------------------------- */

.btn__up {
    background: var(--secondary);
    bottom: 50px;
    color: white;
    opacity: 1;
    position: absolute;
    transition: all var(--duration) var(--timing);
    z-index: 20;
}
.btn__up:hover {
    transform: scale(1.2);
}

.btn__up-disable {
    opacity: 0;
    transition: all var(--duration) var(--timing);
}
```
