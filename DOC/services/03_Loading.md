# Loading Service

Creamos un nuevo servicio con el siguiente comando:

```txt
ng g s services/loading --skip-tests
```

En nuestro servicio creamos una instancia de `Subject` de tipo boolean, esta clase es un tipo de Observable especial, que permite que los valores puedan ser casteados por múltiples observadores, es similar a `EventEmitters`. Las funciones de `show` y `hidden`, se encargan de asignarle un valor a la instancia creada.

```ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    public isLoading = new Subject<boolean>();

    public show = (): void => this.isLoading.next(true)

    public hide = (): void => this.isLoading.next(false)
}
```
