# Sticky Header

Vamos a crear un nuevo componente que funcionar como el header de nuestro módulo de Auth. Anteriormente lo estaba creando dentro del componente `Main`, pero para poder separar por componentes nuestra lógica, he decidido crear un nuevo componente. Para ello creo el componente con el siguiente comando:

```txt
ng g c auth/components/sticky-header --skip-tests
```

Las clases que tenia de CSS dentro del componente `Main`, ahora pertenecerán a la hoja de estilos del nuevo componente. Lo mismo va a pasar el contenido del menú en el template y los elementos de la clase.

## Clase del componente

Dentro de la clase del componente, definimos un arreglo de objetos para los enlaces básicos. También tenemos una variable booleana que nos permite determinar la clase a añadir dentro elemento HTML dependiendo de si se ha hecho scroll o no. Dentro del método `ngOnInit` implementado de la interfaz `OnInit`, evaluamos las condiciones del scroll de la vista:

```ts
import { Component, OnInit } from '@angular/core';


...
export class StickyHeaderComponent implements OnInit {
    public items = [
        {
            label: 'Iniciar Sesión',
            routerLink: '/auth/login'
        },
        {
            label: 'Crear Cuenta',
            routerLink: '/auth/register'
        }
    ]

    public enableSticky: boolean = false


    ngOnInit(): void {
        this.stickyMenu()
    }


    stickyMenu() {
        window.onscroll = () => {
            console.log(window.scrollY)
            if (window.scrollY > 10) {
                this.enableSticky = true
            } else {
                this.enableSticky = false
            }
        }
    }
}
```

## Template del componente

Como se menciono anteriormente, dentro de los estilos hay una clase que se va a añadir de manera condicional al menú. Para ello usamos la directiva `[ngClass]` y dentro el operador ternario:

```html
<div class="sticky__nav" [ngClass]="enableSticky ? 'sticky': ''">
    <div class="auth__img">
        <img src="../../../../assets/logo_santoto_tunja_2022.png" alt="USTA">
    </div>

    <div class="auth__links">
        <a *ngFor="let item of items" [routerLink]="item.routerLink" routerLinkActive="router-link-active"
            [routerLinkActiveOptions]="{ exact: true }" #rla="routerLinkActive"
            [class]="!rla ? 'router-link-active' : ''">
            {{ item.label }}
        </a>
    </div>
</div>
```

### CSS del componente

```css
.sticky__nav {
    align-items: center;
    background: linear-gradient(rgb(10, 30, 78), rgb(8, 22, 56));
    border-bottom: 2px solid var(--gold);
    display: flex;
    flex-flow: row nowrap;
    flex: 0 1 auto;
    height: var(--sticky-height);
    padding-inline: calc(var(--sticky-height) * 0.9);
    position: fixed;
    transition: all var(--duration);
    width: 100vw;
    z-index: 10;
}
.sticky__nav.sticky {
    height: var(--sticky-height-mini);
}


.auth__img {
    flex: 1;
    height: 100%;
    padding: 10px;
}
.auth__img img {
    height: 100%;
}


.auth__links {
    align-items: center;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    width: calc(100vw * 0.2);
}
.auth__links a {
    color: var(--text-light);
    font-size: 17.5px;
}
.auth__links a.router-link-active,
.auth__links a:hover {
    color: var(--gold);
    transition: all var(--duration);
}
```
