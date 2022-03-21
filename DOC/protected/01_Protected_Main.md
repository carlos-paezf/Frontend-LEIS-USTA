# Protected - Main

El componente `src/protected/pages/main` se encarga de albergar el `<router-outlet></router-outlet>` de las rutas del módulo protegido, por lo tanto se puede considerar el contenedor de las vistas de dicho módulo. Además cuenta con una Sidenav para la identificación de la institución por su logo, y la navegación dentro de la aplicación.

La clase del componente no va a tener nada. Lo importante es el uso del selector del menú dentro del template.

## Template del componente

```html
<div class="app">
    <app-sidenav></app-sidenav>

    <div class="content">
        <router-outlet></router-outlet>
    </div>
</div>
```

## Estilos del componente

```css
.app {
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    background: #fff;
    width: 100vw;
    max-width: 100%;
    min-width: var(--sidenav-width);
    box-shadow: rgba(#000, 0.1) 0 7px 29px 0;
}


.content {
    flex: 1;
    border-radius: var(--radius);
    margin-left: 10px;
}
```
