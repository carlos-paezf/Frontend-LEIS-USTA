# Items Service

Creamos un nuevo servicio con el siguiente comando:

```txt
ng g s protected/services/items --skip-tests
```

Nuestro servicio tiene la finalidad de poder hacer sugerencias dentro del componente `InputAutocomplete`. Tenemos un arreglo de Items, los cuales tienen por valor inicial el arreglo que se encuentra dentro del mock `items-search.mock.ts`. Luego, tenemos un primer método que se encarga de obtener un Item luego de filtrar su Id. El segundo método se encarga de hacer sugerencias a partir de las coincidencias que hagan match con el término de búsqueda, para ello creamos una expresión regular, convertimos los labels de los items en minúscula y retornamos aquellos que hagan match.

```ts
import { Injectable } from '@angular/core';
import { ItemsMenu } from '../interfaces';
import { ITEMS_SEARCH } from '../mocks';


@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    public items: ItemsMenu[] = ITEMS_SEARCH

    constructor() { }

    public getItemByID = (id: number): ItemsMenu => {
        const item: ItemsMenu[] = this.items.filter(item => item.id === id)
        return item[0]
    }

    public getSuggestions = (term: string): ItemsMenu[] => {
        const items: ItemsMenu[] = this.items.filter(item => {
            const regex = new RegExp(`${term.toLowerCase()}[a-zA-Z]*`, 'g')
            return item.label.toLowerCase().match(regex)
        })
        return items
    }
}
```
