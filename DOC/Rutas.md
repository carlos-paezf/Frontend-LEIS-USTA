# Rutas de la aplicación y LazyLoad

## Creación de los módulos de Auth y Protected

Vamos a crear 2 módulos dentro de nuestra aplicación. El primero se llamará `auth`, y se encargara del Inicio de Sesión y del Registro del Usuario. El segundo módulo llamado `protected`, se encargara de almacenar todos los módulos dentro de nuestra aplicación (*Dashboard*, *Equipment*, etc.). Para crearlos usamos los siguientes comandos:

```txt
ng g m auth
```

```txt
ng g m protected
```

## app-routing.module.ts - Rutas padre de la aplicación - LazyLoad

Vamos a configurar las rutas padre de nuestra aplicación dentro del archivo `src/app/app-routing.module.ts`. El ideal es poder usar ***LazyLoad*** para optimizar el rendimiento de nuestra aplicación, mejorando los tiempos de carga de los componentes dentro del sitio web. Las rutas son provistas a la raíz del proyecto mediante el método `.forRoot()`, por lo que podemos acceder a las mismas desde cualquier parte de la aplicación (teniendo en cuenta las validaciones).

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { 
        path: 'auth', 
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
    },
    { 
        path: 'dashboard',
        loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

Dentro de cada módulo se van a configurar las rutas hijas, las cuales son reportadas dentro de las importaciones en el decorador `@NgModule` de cada archivo de definición del módulo.

Es importante que dentro del archivo `src/app/app.component.html` tengamos el marcador de posición **RouterOutlet** para poder usar las rutas de nuestra aplicación.

```html
<router-outlet></router-outlet>
```

## AuthModule

### Componentes del módulo Auth

Necesitamos crear los componentes que se mostrarán dentro del módulo Auth, en este caso una vista de *Login* y una de *Register*. Además tenemos un componente Main que va se va a encargar de tener el marcador de posición **RouterOutlet** dentro de su template. En base de lo anterior, usamos los siguientes comandos (`--skip-tests`: Evitamos la creación de un archivo de pruebas, `-is`: Evitamos la creación de un archivo de estilos y permitimos el Inline Style dentro del decorador `@Component` del componente):

```txt
ng g c auth/pages/login --skip-tests
```

```txt
ng g c auth/pages/register --skip-tests
```

```txt
ng g c auth/pages/main --skip-tests -is
```

Cada que se crean los componentes, de manera automática son agregados dentro las declaraciones del decorador `@NgModule` de `AuthModule`:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        MainComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AuthModule { }
```

Dentro del template del componente `MainComponent` necesitamos ubicar el RouterOutlet para el conjunto de rutas hijas del módulo Auth:

```html
<router-outlet></router-outlet>
```

### auth-routing.module.ts - Rutas hijas para el módulo Auth

Creamos un módulo de routing para las rutas del módulo Auth con el siguiente comando (`--flat`: creación de un archivo sin directorio):

```txt
ng g m auth/auth-routing --flat
```

Con lo anterior obtenemos un archivo llamado `src/app/auth/auth-routing.module.ts`, en el cual creamos un arreglo con las rutas del módulo, las cuales son entregadas en el decorador `@NgModule` como rutas hijas al `RouterModule` mediante el método `.forChild()`, y luego exportamos la configuración de dicho `RouterModule`.

```ts
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


const routesAuth: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', redirectTo: 'login' },
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routesAuth)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
```

El siguiente paso es importar el módulo de rutas dentro del decorador `@NgModule` del módulo Auth, esto con el fin de poder tener disponibles las rutas al momento de hacer el LazyLoad:

```ts
...
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
    ...,
    imports: [
        ...,
        AuthRoutingModule
    ]
})
export class AuthModule { }
```
