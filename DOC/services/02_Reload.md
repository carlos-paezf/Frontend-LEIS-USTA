# Reload

Creamos un nuevo servicio con el siguiente comando:

```txt
ng g s services/reload --skip-tests
```

Necesitamos inyectar Router dentro del servicio para poder recargar el componente en el que se llame el servicio. El método `reloadCurrentRoute()` recibe la url actual.

Mediante la dependencia inyectada evitamos reusar las rutas, y luego nos suscribimos a los eventos del router y si los eventos son de la instancia de `NavigationEnd`, entonces evitamos la navegación. Luego navegamos por la url actual, pero saltando los cambios de la locación actual, esto con el fin de que se haga un tipo de Hot Reload.

```ts
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ReloadService {

    constructor(private _router: Router) { }

    public reloadCurrentRoute = (currentUrl: string) => {
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false
        }
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._router.navigated = false
            }
        })
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate([currentUrl]);
        });
    }
}
```
