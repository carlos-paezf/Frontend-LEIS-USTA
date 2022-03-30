# Card Icons

Creamos un componente que se va a especializar en los iconos-botones que se encuentran en la vista del Dashboard, para ello usamos el siguiente comando:

```txt
ng g c protected/modules/dashboard/components/card-icons --skip-test
```

## Clase del componente

Nuestro componente recibe del componente padre las variables de icono, label, ruta y color.

```ts
import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-card-icons',
    templateUrl: './card-icons.component.html',
    styleUrls: ['./card-icons.component.css']
})
export class CardIconsComponent {

    @Input() public icon!: string
    @Input() public label!: string
    @Input() public route!: string
    @Input() public color!: string

}
```

## Template del componente

```html
<div class="card__icons" [routerLink]="route">
    <i [class]="icon" [style]="'color:' + color"></i>
    <label for="label" class="card__label">{{ label }}</label>
</div>
```

## CSS del componente

```css
/*! Tarjeta de los iconos ------------------------------------------------------------ */
.card__icons {
    align-items: center;
    background: var(--text-on-primary);
    border-radius: var(--radius);
    box-shadow: 5px 5px 5px var(--text-light);
    color: var(--primary);
    display: flex;
    flex-flow: column nowrap;
    height: 200px;
    justify-content: space-evenly;
    margin: 15px 50px;
    transition: all var(--duration) var(--timing);
    width: 200px;
}
.card__icons:hover {
    color: var(--orange);
    transform: scale(1.05);
}



/*! Icono de cada tarjeta ------------------------------------------------------------ */

i {
    font-size: 100px;
}



/*! Texto de cada tarjeta ------------------------------------------------------------ */

.card__label {
    display: inline-block;
    font-size: 20px;
    overflow: hidden;
    padding: 0 15px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
```
