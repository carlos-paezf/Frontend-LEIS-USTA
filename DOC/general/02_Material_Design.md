# Angular - Material Design

Dentro de nuestro proyecto podemos usar [Angular Material](https://material.angular.io/), el cual proveé componentes de Material Design para Angular. La manera en que lo añadimos a nuestro trabajo, es con el siguiente comando:

```txt
ng add @angular/material
```

## Módulo para MaterialDesign

Dentro de nuestro proyecto creamos un nuevo módulo que gestiones los módulos de Angular Material. Para la creación del módulo usamos el siguiente comando:

```txt
ng g m protected/material-design
```

Lo que tendremos del componente, son las importaciones de los módulos dentro de la propiedad `exports` del decorador `@NgModule`. Por ejemplo el módulo para autocomplete:

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

Dentro de los módulos que necesitemos de los componentes de Material Design, hacemos la importación del módulo recién creado, por ejemplo, para el módulo de Protected:

```ts
...
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
    ...,
    imports: [
        ..., 
        MaterialDesignModule
    ]
})
export class ProtectedModule { }
```
