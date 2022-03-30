# Dashboard

Vamos a crear la vista principal para el Dashboard, por lo que usamos el siguiente comando:

```txt
ng g c protected/modules/dashboard/pages/dashboard --skip-tests
```

## Clase del componente

Nuestro componente establece un listado de Items, de Mensajes (de equipos o de préstamos), y la cantidad de mensajes no leídos. En el constructor hacemos la inyección de nuestro servicio para el manejo de los Mensajes. En el método `ngOnInit` implementado de la interfaz `OnInit`, establecemos el valor inicial de nuestro items del dashboard, además de llamar los métodos para obtener los mensajes en el punto del inicio del ciclo del vida del componente.

Los métodos para obtener los mensajes se suscriben al observable del servicio para obtener todos los mensajes, pero luego hacen un filtro dependiendo de la categoría, además de que los ordena por fecha y por mensajes leídos y no leídos. Una vez organizados, entonces se recorren para saber cuantos están marcado como no leídos para poder aumentar el contador respectivo.

```ts
import { Component, OnInit } from '@angular/core';
import { ItemsMenu, MsgGeneric } from 'src/app/protected/interfaces';
import { ITEMS_DASHBOARD } from 'src/app/protected/mocks';
import { MessagesService } from 'src/app/protected/services';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public items: ItemsMenu[] = []
    public msgEquipment: MsgGeneric[] = []
    public unreadMsgEquipment: number = 0
    public msgLoan: MsgGeneric[] = []
    public unreadMsgLoan: number = 0


    constructor(private _msgService: MessagesService) { }


    ngOnInit(): void {
        this.items = ITEMS_DASHBOARD

        this.getMessagesForEquipment()
        this.getMessagesForLoan()
    }


    public getMessagesForEquipment = () => {
        this._msgService.getMessagesByCategory('equipment')
            .subscribe((msgs: MsgGeneric[]) => {
                const tempUnread = this.sortMsgs(msgs.filter(msg => !msg.check))
                const tempRead = this.sortMsgs(msgs.filter(msg => msg.check))
                this.msgEquipment = [...tempUnread, ...tempRead]
                this.msgEquipment.filter(msg => !msg.check).forEach(_ => this.unreadMsgEquipment += 1)
            })
    }


    public getMessagesForLoan = () => {
        this._msgService.getMessagesByCategory('loan')
            .subscribe((msgs: MsgGeneric[]) => {
                const tempUnread = this.sortMsgs(msgs.filter(msg => !msg.check))
                const tempRead = this.sortMsgs(msgs.filter(msg => msg.check))
                this.msgLoan = [...tempUnread, ...tempRead]
                this.msgLoan.filter(msg => !msg.check).forEach(_ => this.unreadMsgLoan += 1)
            })
    }


    public sortMsgs = (msgs: MsgGeneric[]) => {
        return msgs.sort((a, b) => {
            if (a.date < b.date) return 1
            if (a.date > b.date) return -1
            return 0
        })
    }
}
```

## Template del componente

```html
<div class="dashboard" id="dashboard">
    <app-title [title]="'Dashboard'"></app-title>

    <div class="dashboard__items">
        <app-card-icons *ngFor="let item of items; let i = index" [id]="'card-item-'+i" [icon]="item.icon!"
            [label]="item.label" [route]="item.routerLink" [color]="item.color!"></app-card-icons>
    </div>

    <div class="dashboard__info">
        <app-card-info [title]="'Alertas de Equipos'" [messages]="msgEquipment" [unreadMessages]="unreadMsgEquipment"
            [idCard]="'1'">
        </app-card-info>
        <app-card-info [title]="'Alertas de Préstamos'" [messages]="msgLoan" [unreadMessages]="unreadMsgLoan"
            [idCard]="'2'">
        </app-card-info>
    </div>
</div>
```

## CSS del componente

```css
/*! Contenedor general del Dashboard --------------------------------------------- */

.dashboard {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    margin-top: 6rem;
    width: 100%;
}



/*! Contenedor de los items de navegación ---------------------------------------- */

.dashboard__items {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 30px;
    padding: 0 100px;
    transition: all var(--duration) var(--timing);
}



/*! Contenedor de las notificaciones --------------------------------------------- */

.dashboard__info {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 0 10px;
    width: 100%;
    margin: 30px 0;
}
```
