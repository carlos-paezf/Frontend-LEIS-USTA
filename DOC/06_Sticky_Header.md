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
<div class="menu__auth" [ngClass]="enableSticky ? 'menu__sticky' : ''" >
    <div class="menu__img">
        <img src="../../../../assets/logo_santoto_tunja_2022.png" alt="USTA" height="90%">
    </div>
    <div class="menu__links">
        <a *ngFor="let item of items" [routerLink]="[item.routerLink]" routerLinkActive="router-link-active">
            {{ item.label }}
        </a>
    </div>
</div>
```

### CSS del componente

```css
.menu__auth,
.menu__links,
.menu__img {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.menu__auth {
    background: linear-gradient(rgb(10, 30, 78), rgb(8, 22, 56));
    background: rgb(8, 22, 54);
    border-bottom: 3px solid var(--gold);
    height: 70px;
    justify-content: space-between;
    padding: 0 100px;
    position: fixed;
    top: 0;
    transition: all .3s;
    width: 100vw;
}


.menu__sticky {
    height: 60px;
    transition: all .3s;
}


.menu__img {
    margin: 0 50px;
}

.menu__img,
.menu__links {
    height: 100%;
    width: 50%;
}

.menu__links {
    justify-content: end;
}

.menu__links a {
    color: white;
    font-size: 17.5px;
    margin: 0 20px;
    text-decoration: none;
}

.menu__links a:hover {
    color: var(--gold);
    transition: all 0.3s;
}
```
