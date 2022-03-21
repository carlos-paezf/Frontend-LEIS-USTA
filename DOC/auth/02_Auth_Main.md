# Auth - Main

El componente `src/app/auth/pages/main`, se encarga de albergar el `<router-outlet></router-outlet>` de las rutas del módulo de autenticación, por lo tanto se puede considerar el contenedor de las vistas de dicho módulo. Además cuenta con una Navbar para la identificación de la institución por su logo, y los enlaces básicos del módulo de auth.

La clase del componente no va a tener nada, y tampoco sus hoja de estilos. Lo importante es el uso del selector del menú dentro del template.

## Template del componente

El template (HTML) del componente es simple, un menú en la parte superior, y el marcador de posición para el módulo:

```html
<div class="app__auth">
    <app-sticky-header></app-sticky-header>
    
    <div class="content__auth">
        <router-outlet></router-outlet>
    </div>
</div>
```

## Estilo del componente

```css
.app__auth {
	background: #fff;
	box-shadow: rgba(#000, 0.1) 0 7px 29px 0;
	display: flex;
	flex-flow: column nowrap;
	max-width: 100%;
	min-width: var(--sidenav-width);
	width: 100vw;
	height: 100vh;
	justify-content: space-between;
}


.content__auth {
	flex: 1;
    margin-top: var(--sticky-height);
}
```
