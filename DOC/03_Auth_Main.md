# Auth - Main

El componente `src/app/auth/pages/main`, se encarga de albergar el `<router-outlet></router-outlet>` de las rutas del módulo de autenticación, por lo tanto se puede considerar el contenedor de las vistas de dicho módulo. Además cuenta con una Navbar para la identificación de la institución por su logo, y los enlaces básicos del módulo de auth.

La clase del componente no va a tener nada, y tampoco sus hoja de estilos. Lo importante es el uso del selector del menú dentro del template.

## Template del componente

El template (HTML) del componente es simple, un menú en la parte superior, y el marcador de posición para el módulo:

```html
<app-sticky-header></app-sticky-header>

<!-- Directiva de Enrutamiento  -->
<router-outlet></router-outlet>
```
