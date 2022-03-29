# Input Autocomplete

Creamos un nuevo componente con el siguiente comando:

```txt
ng g c protected/shared/input-autocomplete --skip-tests
```

## Autocomplete Material Design

Vamos a utilizar el componente de Autocomplete de Material Design, por lo que haremos lo siguiente dentro del módulo respectivo:

```ts
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'


@NgModule({
    exports: [
        MatAutocompleteModule
    ]
})
export class MaterialDesignModule { }
```

## Clase del componente

En la clase de nuestro componente tenemos la posibilidad de modificar el background del input desde el componente padre que lo llama. También tenemos una variable para el termino a buscar y un arreglo con los items resultantes de la búsqueda, su valor inicial es un arreglo que se simula desde un mock llamado `src/protected/mocks/items-search.mock.ts`.

Hacemos la inyección del servicio que maneja los items del menú, para poder hacer uso de las funciones en los métodos de obtener sugerencias o de seleccionar un item por su ID.

```ts
import { Component, Input } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemsService } from 'src/app/protected/services';

import { ItemsMenu } from '../../interfaces';
import { ITEMS_SEARCH } from '../../mocks';


@Component({
    selector: 'app-input-autocomplete',
    templateUrl: './input-autocomplete.component.html',
    styleUrls: ['./input-autocomplete.component.css']
})
export class InputAutocompleteComponent {

    @Input() background: string = 'var(--primary-lighter)'

    public term: string = ''
    public items: ItemsMenu[] = ITEMS_SEARCH

    constructor(private _itemsService: ItemsService) { }

    public searching = () => {
        this.items = this._itemsService.getSuggestions(this.term)
    }

    public optionSelected = (event: MatAutocompleteSelectedEvent): void => {
        const item: ItemsMenu = event.option.value
        this.term = item.label
        this._itemsService.getItemByID(item.id!)
    }
}
```

## Template del componente

Hacemos uso del selector `mat-autocomplete` para poder llamar el componente de Material Design.

```html
<input type="text" class="search__input" id="search" placeholder="Buscar Item" aria-label="Search a item" matInput
    [(ngModel)]="term" [matAutocomplete]="auto" (input)="searching()" [style]="'background:' + background">
    
<mat-autocomplete #auto="matAutocomplete" (optionSelected)="optionSelected($event)" id="autocomplete">
    <mat-option *ngFor="let item of items" [value]="item" class="search__option" [routerLink]="item.routerLink"
        routerLinkActive="is-active" #rla="routerLinkActive" [class]="!rla ? 'search__option is-active' : 'search__option'">
        {{ item.label }}
    </mat-option>
</mat-autocomplete>
```

## CSS del componente

```css
/*! Opciones Sugeridas ------------------------------------- */

.search__option {
    /* font-family: 'PT Serif', serif !important; */
    background: var(--primary-lighter) !important;
    color: var(--text-on-primary) !important;
}
.search__option:hover {
    background: var(--primary) !important;
    color: var(--gold) !important;
}
.search__option:focus {
    background: var(--primary) !important;
    color: var(--text-on-primary) !important;
}


.search__option.is-active {
    background: var(--primary-lighter) !important;
    color: var(--gold) !important;
}
.search__option.is-active:focus,
.search__option.is-active:hover {
    background: var(--primary) !important;
    color: var(--gold) !important;
}
```
