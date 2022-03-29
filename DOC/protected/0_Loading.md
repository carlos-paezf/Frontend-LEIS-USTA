# Loading

Vamos a crear un componente que se mostrara cada que la aplicación este efectuando alguna acción que requiera de una espera para el usuario, por ejemplo las peticiones HTTP. Usamos el siguiente comando:

```txt
ng g c shared/loading --skip-tests
```

## Clase del componente

Establecemos una variable para que toma el valor que retorna la inyección del servicio `LoadingService`.

```ts
import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services';


@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

    public isLoading = this._loadingService.isLoading

    constructor(private _loadingService: LoadingService) { }
}
```

## Template del componente

Usamos un generador de spinners para loading llamado [Loading.io](https://loading.io), el cual nos muestra el template y el CSS

```html
<div class="overlay" *ngIf="isLoading | async">
    <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
```

## CSS del componente

```css
.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}

.lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--secondary);
    margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
}

.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
}

.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
}

.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}

.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
}

.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
}

.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
}

.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
}

@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}




.overlay {
    align-items: center;
    background: rgba(133, 134, 135, 0.573);
    display: flex;
    height: 100%;
    justify-content: center;
    position: fixed;
    left: 3.05rem;
    width: 100%;
    z-index: 40;
}
```
