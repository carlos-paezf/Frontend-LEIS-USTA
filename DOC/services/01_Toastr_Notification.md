# Toastr Notification

Creamos un servicio para la gestión de los toastr con el siguiente comando:

```txt
ng g s services/toastr-notification --skip-tests
```

El contenido del servicio es un objeto de parámetros iniciales del los toastr. Luego, hay algunos métodos que generan los toastr según la necesidad. Los toastr son inyectados desde el servicio `ToastrServices` que vienen del paquete `ngx-toastr`.

```ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class ToastrNotificationService {

    public params = {
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 8000
    }


    constructor(private _toastr: ToastrService) { }


    public success = (message: string, title: string, params: any = this.params): void => {
        this._toastr.success(message, title, params)
    }


    public error = (message: string, title: string, params: any = this.params): void => {
        this._toastr.error(message, title, params)
    }


    public info = (message: string, title: string, params: any = this.params): void => {
        this._toastr.info(message, title, params)
    }


    public warning = (message: string, title: string, params: any = this.params): void => {
        this._toastr.warning(message, title, params)
    }
}

```
