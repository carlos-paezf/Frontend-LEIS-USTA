# Auth - Main

El componente `src/app/auth/pages/main`, se encarga de albergar el `<router-outlet></router-outlet>` de las rutas del módulo de autenticación, por lo tanto se puede considerar el contenedor de las vistas de dicho módulo. Además cuenta con una Navbar para la identificación de la institución por su logo, y los enlaces básicos del módulo de auth.

## Clase del componente

La clase de este objeto cuenta con el decorador `@Component` en donde tenemos las propiedades del selector, el enlace a los archivos de template y css. El único contenido del componente es un arreglo de objectos que contiene un nombre y un path, los cuales serán renderizados dentro del template.

```ts
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.css' ]
})
export class MainComponent {
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
}
```

## Template del componente

El template (HTML) del componente es simple, un menú en la parte superior, y el marcador de posición para el módulo:

```html
<div class="menu__auth">
    <div class="menu__img">
        <img src="../../../../assets/logo_santoto_tunja_2022.png" alt="USTA" height="55px">
    </div>
    <div class="menu__links">
        <a *ngFor="let item of items" [routerLink]="[item.routerLink]" routerLinkActive="router-link-active">
            {{ item.label }}
        </a>
    </div>
</div>

<!-- Directiva de Enrutamiento  -->
<router-outlet></router-outlet>
```

## CSS dedicado al componente

Dentro del archivo `main.component.css` tenemos los siguientes estilos especiales para el componente.

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
    width: 100vw;
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
