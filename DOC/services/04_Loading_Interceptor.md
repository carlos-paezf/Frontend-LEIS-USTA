# Loading Interceptor

Creamos un nuevo servicio que nos permita interceptar las peticiones HTTP y mostrar el componente de Loading mientras se resuelve la petición, para ello usamos el siguiente comando:

```txt
ng g s services/loading-interceptor --skip-tests
```

Necesitamos inyectar el servicio `LoadingService` para poder usar sus funciones. Cuando se intercepta la petición, se muestra el loading, una vez se resuelve o finaliza, entonces se oculta el loading.

```ts
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services';


@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

    constructor(private _loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingService.show()
        return next.handle(req)
            .pipe(finalize(() => this._loadingService.hide()))
    }
}
```

Este servicio es usado dentro del módulo `app.module.ts`, para lo cual necesitamos importar los `HTTP_INTERCEPTORS`, y proveerlos dentro del decorador `@NgModule`, junto a la anterior clase de nuestro servicio, además de que se pueden usar múltiples inyecciones en múltiples proveedores:

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from './services';
...

@NgModule({
    ...,
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptorService,
            multi: true
        }
    ]
})
export class AppModule { }
```
