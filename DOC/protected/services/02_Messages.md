# Messages Service

Creamos un nuevo servicio con el siguiente comando:

```txt
ng g s protected/services/messages --skip-tests
```

Nuestro servicio requiere de usar HTTP, por lo tanto debemos hacer la importación de `HttpClientModule` dentro del módulo `app.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
    ...,
    imports: [
        HttpClientModule,
        ...
    ]
})
export class AppModule { }
```

Dentro de nuestro servicio, tenemos un endpoint al que le haremos las peticiones respecto a los mensajes. Debemos inyectar una dependencia de HttpClient, puesto que nuestro métodos van a emplearlo. Los métodos presentes en el servicio, tienen la misión de formar un CRUD con respecto a los mensajes, por ello tenemos método de obtener, crear, actualizar y eliminar.

```ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsgGeneric } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    public urlEndpoint: string = 'http://localhost:3000/messages'


    constructor(private _http: HttpClient) { }


    public getMessages = (): Observable<MsgGeneric[]> => {
        return this._http.get<MsgGeneric[]>(this.urlEndpoint)
    }


    public getMessageByID = (id: string): Observable<MsgGeneric> => {
        return this._http.get<MsgGeneric>(`${this.urlEndpoint}/${id}`)
    }


    public getMessagesByCategory = (category: string): Observable<MsgGeneric[]> => {
        const params = new HttpParams()
            .set('q', `${category}`)
            .set('_limit', '25')
        return this._http.get<MsgGeneric[]>(this.urlEndpoint, { params })
    }


    public createMessage = (msg: MsgGeneric): Observable<MsgGeneric> => {
        return this._http.post<MsgGeneric>(this.urlEndpoint, msg)
    }


    public updateMessage = (msg: MsgGeneric): Observable<MsgGeneric> => {
        return this._http.put<MsgGeneric>(`${this.urlEndpoint}/${msg.id}`, msg)
    }


    public deleteMessage = (id: string): Observable<MsgGeneric> => {
        return this._http.delete<MsgGeneric>(`${this.urlEndpoint}/${id}`)
    }
}
```
