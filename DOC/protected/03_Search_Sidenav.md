# Search dentro del Sidenav

Dentro de nuestro component de Sidenav, tenemos una sección en donde hay un pequeño buscador. La idea es que dicho elemento, nos permita buscar títulos o enlaces a vistas dentro de nuestra aplicación.

Podemos tener del lado del backend un servicio que nos retorne un arreglo con las rutas, y a partir de la respuesta mostrar los resultados que coinciden. Por el momento, haremos un manejo de las búsquedas con el servidor del archivo json ([Servidor Temporal](../temporal_server/01_Server_Temporal.md)). También tenemos la opción de tener un archivo JSON dentro de nuestro frontend, con el cual podemos recorrer sus elementos.

## AutoComplete de Material Design

Necesitamos el componente de AutoComplete de Angular Material, para lo cual hacemos la importación del módulo dentro de `material.design.module.ts`

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

Ahora, dentro del archivo `protected.module.ts` necesitamos hacer 2 importaciones, el módulo de Material Design, y un módulo para Formularios tradicionales:

```ts
...
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
    ...,
    imports: [
        ...,
        FormsModule,
        MaterialDesignModule
    ]
})
export class ProtectedModule { }
```

## Componente de AutoComplete

Vamos a crear un nuevo componente dentro del directorio de Sidenav, con el fin de descentralizar la lógica de nuestro input.

```txt
ng g c protected/shared/sidenav/input-autocomplete --skip-tests
```

La clase de nuestro componente tendrá 2 variables: la primera es el termino a buscar, y la segunda es el arreglo de items que se obtenga. Esta última, va a estar apegada a la interfaz de `ItemSidenav`

```ts
...
import { ItemSidenav } from '../../interfaces/item-sidenav';


...
export class InputAutocompleteComponent {

    public term: string = ''
    public items: ItemSidenav[] = []
    ...
}
```

Posteriormente tenemos la inyección de nuestro servicio `ItemsService`, el cual es un servicio creado por nosotros (Se explica más adelante).

```ts
...
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';


...
export class InputAutocompleteComponent {
    ...
    constructor(private _itemsService: ItemsService) { }
    ...
}
```

Por último tenemos 2 métodos:

- `searching`: Es un método que acude al servicio que creamos para poder obtener sugerencias a partir de un termino, y la respuesta que se obtiene, se convierte en el contenido del arreglo de Items.
- `optionSelected`: Es una función que recibe un evento de tipo `MAtAutocompleteSelectedEvent`, es decir, la opción que se selecciona del panel de sugerencias. Cuando se selecciona el item, se establece el nombre del item dentro del input, y luego se usa un método del servicio para poder obtener un item por su id.

```ts
...
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


...
export class InputAutocompleteComponent {
    ...
    public searching = () => {
        this.items = this._itemsService.getSuggestions(this.term)
        console.log(this.items)
    }


    public optionSelected = (event: MatAutocompleteSelectedEvent): void => {
        const item: ItemSidenav = event.option.value
        this.term = item.label
        this._itemsService.getItemByID(item.id!)
    }
}
```

## Servicio para acceder tener sugerencias

Generamos un servicio para poder acceder a un arreglo de items que tenemos dentro del archivo `src/app/protected/utils/items.util.ts`.

```txt
ng g s protected/shared/services/items --skip-tests
```

Los servicios son provistos en la raíz del proyecto mediante la propiedad `providedIn` del decorado `@Injectable`. Nuestro servicio va a tener una propiedad que almacena todos los items de nuestro util:

```ts
import { Injectable } from '@angular/core';
import { ItemSidenav } from '../interfaces/item-sidenav';
import { itemsUtil } from '../../utils/items.util';


@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    public items: ItemSidenav[] = itemsUtil
    ...
}
```

El primer método que ofrecemos dentro de nuestro servicio, es un método para obtener un item mediante un id que se ingresa por parámetro. El segundo servicio retorna los elementos del arreglo que coinciden con un termino ingresado, el cual es convertido en una expresión regular para poder efectuar un match de manera global con el label de cada item.

```ts
...
export class ItemsService {
    ...
    public getItemByID = (id: number): ItemSidenav => {
        const item: ItemSidenav[] = this.items.filter(item => item.id === id)
        return item[0]
    }

    public getSuggestions = (term: string): ItemSidenav[] => {
        const items: ItemSidenav[] = this.items.filter(item => {
            const regex = new RegExp(`${term.toLowerCase()}[a-zA-Z]*`, 'g')
            return item.label.toLowerCase().match(regex)
        })
        return items
    }
}
```

## Template del componente

```html
<input type="text" class="search__input" id="search" placeholder="Buscar Item" aria-label="Search a item" matInput
    [(ngModel)]="term" [matAutocomplete]="auto" (input)="searching()">
    
<mat-autocomplete #auto="matAutocomplete" (optionSelected)="optionSelected($event)" id="autocomplete">
    <mat-option *ngFor="let item of items" [value]="item" class="search__option" [routerLink]="item.routerLink"
        routerLinkActive="is-active" #rla="routerLinkActive" [class]="!rla ? 'search__option is-active' : 'search__option'">
        {{ item.label }}
    </mat-option>
</mat-autocomplete>
```

## Estilo del componente

Dentro del estilos del componente tenemos las siguientes clases:

```css
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

En el archivo `styles.css` fue necesario definir algunas clases compartidas a nivel general:

```css
/*! Contenedor del Sidenav ----------------------------------- */

.sidenav.is-collapsed {
    width: 5.5rem;
}


/*! Estilos del Componente InputAutoComplete ----------------- */
app-input-autocomplete {
    width: 100%;
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
    width: 100%;
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


.sidenav.is-collapsed .search {
    opacity: 0 !important;
    visibility: hidden;
}
```
