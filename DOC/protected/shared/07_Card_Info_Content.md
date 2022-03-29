# Card Info Content

Creamos un nuevo componente con el siguiente comando:

```txt
ng g c protected/shared/card-info-content --skip-tests
```

## Interfaz de Mensajes

Creamos una interfaz para manejar el tipado de los mensajes, esto lo hacemos con el siguiente comando:

```txt
ng g i protected/interfaces/msg-generic
```

El contenido de está interfaz será el siguiente:

```ts
export interface MsgGeneric {
    id: string,
    title: string,
    category: string
    msg: string,
    date: Date,
    check: boolean
}
```

## Clase del componente

Nuestro componente recibe un mensaje individual, para el cual se interpola la información dentro del template. Necesitamos hacer la inyección de múltiples dependencias, con el fin de poder marcar como leído o no un mensaje:

- `Router`: Necesitamos obtener la ruta actual del componente
- `MessagesService`: Servicio personalizado para el CRUD de los mensajes
- `ToastrNotificationService`: Servicio personalizado para la manipulación de los toastr
- `ReloadService`: Servicio personalizado para recargar el componente a partir de la ruta actual.

El método `toggleCheck` es una función que se llama para poder cambiar el estado del mensaje entre leído o no. Para ello debemos usar el método de actualizar los mensajes desde el servicio destinado para ello, y para por parámetros un objeto con una copia del elemento, pero modificando la propiedad de check. Nos suscribimos al observable que se retorna y hacemos aparecer un toastr con una notificación, y recargamos el componente para visualizar los cambios.

```ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsgGeneric } from 'src/app/protected/interfaces';
import { MessagesService } from 'src/app/protected/services';
import { ReloadService, ToastrNotificationService } from 'src/app/services';


@Component({
    selector: 'app-card-info-content',
    templateUrl: './card-info-content.component.html',
    styleUrls: ['./card-info-content.component.css']
})
export class CardInfoContentComponent {

    @Input() msg!: MsgGeneric


    constructor(
        private _router: Router,
        private _msgService: MessagesService,
        private _toastrService: ToastrNotificationService,
        private _reload: ReloadService) { }


    public toggleCheck = () => {
        this._msgService.updateMessage({ ...this.msg, check: !this.msg.check })
            .subscribe(_ => {
                const alert = this.msg.check ? 'Mensaje marcado como no leído' : 'Mensaje marcado como leído'
                this._toastrService.info(alert, 'Información')
                this._reload.reloadCurrentRoute(this._router.url)
            })
    }
}
```

## Template del componente

```html
<div class="card__msg">
    <header class="msg__header">
        <span [class]="msg.check ? 'msg__read' : 'msg__unread'"></span>
        <label class="msg__title">{{ msg.title }}</label>
        <small class="msg__date">{{ msg.date | date }}</small>
    </header>

    <article class="msg__content">{{ msg.msg }}</article>

    <div class="msg__actions">
        <button class="btn btn__check" (click)="toggleCheck()">{{ msg.check ? 'Marcar como no leído' : 'Marcar como leído' }}</button>
        <button class="btn btn__more">Ver más</button>
    </div>
</div>
```

## CSS del componente

```css
/*! Contenedor de la tarjeta de mensaje ------------------------------------------  */

.card__msg {
    background-color: var(--text-on-primary);
    border-radius: var(--radius-sm);
    box-shadow: 5px 5px 5px var(--text-light);
    color: var(--primary);
    display: flex;
    flex-flow: column nowrap;
    height: 250px;
    justify-content: space-around;
    margin: 10px 0;
    min-height: 250px;
    overflow-y: hidden;
    padding: 20px 25px;
    transition: all var(--duration) var(--timing);
    width: 100%;
}
.card__msg:hover {
    background-color: var(--primary);
    color: var(--gold);
    transform: scale(1.04);
}
.card__msg:hover .msg__content {
    color: var(--text-on-primary);
}



/*! Header del mensaje ----------------------------------------------------------- */

.msg__header {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    position: relative;
    width: 100%;
}


/*! Indicador de Mensaje no leído ------------------------------------------------ */

.msg__unread {
    background: var(--secondary);
    border-radius: var(--radius);
    height: 15px;
    margin-right: 10px;
    width: 15px;
}


/*! Indicador de mensaje leído --------------------------------------------------- */

.msg__read {
    position: absolute;
}


/*! Titulo del mensaje ----------------------------------------------------------- */
.msg__title {
    font-size: 20px;
    font-weight: 600;
}


/*! Fecha del mensaje ------------------------------------------------------------ */

.msg__date {
    position: absolute;
    right: 0;
}



/*! Contenido del mensaje -------------------------------------------------------- */

.msg__content {
    color: var(--text-light);
    font-size: 15px;
    height: 50%;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    width: 100%;
}



/*! Acciones para los mensajes -------------------------------------------------- */

.msg__actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-top: 10px;
}


.btn {
    margin-inline: 10px;
    color: var(--text-on-primary)
}


/*! Botón de ver más ------------------------------------------------------------- */

.btn__more {
    background: var(--primary-light);
}
.btn__more:hover {
    color: var(--gold);
}


.btn__check {
    background: var(--gold);
}
.btn__check:hover {
    color: var(--primary-lighter);
}
```
