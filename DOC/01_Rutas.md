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
        path: '',
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

Con lo anterior obtenemos un archivo llamado `src/app/auth/auth-routing.module.ts`, en el cual creamos un arreglo con las rutas del módulo, las cuales son entregadas en el decorador `@NgModule` como rutas hijas al `RouterModule` mediante el método `.forChild()`, y luego exportamos la configuración de dicho `RouterModule`. Mediante el atributo `pathMatch: 'full'`, logramos que las rutas sean exactas.

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
            { path: 'login', component: LoginComponent, pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, pathMatch: 'full' },
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

## ProtectedModule

### Módulos internos del módulo Protected

Para el módulo de Protected tenemos diversas vistas:

- Dashboard
- Equipos
- Préstamos
- Laboratorios
- Herramientas y Experimentos
- Usuarios
- Estadísticas
- Informes

El trabajo dentro de este componente se distribuirá mediante módulos, ésto con el fin de una distribución de trabajo entre los desarrolladores, además de que podemos hacer los componentes específicos de manera más ordenada en cada módulo, junto a un archivo de rutas con la configuración de rutas hijas, las cuales se procederán a cargar mediante LazyLoad dentro de las rutas del módulo Protected, que a su vez se reporta con las rutas padres de la aplicación.

Vamos a usar los siguientes comandos para crear cada módulo junto a su archivo de rutas:

```txt
ng g m protected/modules/dashboard --routing
```

```txt
ng g m protected/modules/equipment --routing
```

```txt
ng g m protected/modules/loan --routing
```

```txt
ng g m protected/modules/laboratory --routing
```

```txt
ng g m protected/modules/tool-experiment --routing
```

```txt
ng g m protected/modules/users --routing
```

```txt
ng g m protected/modules/statistics --routing
```

```txt
ng g m protected/modules/report --routing
```

Cada archivo de rutas debe tener la siguiente estructura:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ }]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ___RoutingModule { }
```

Y cada módulo padre de dichas rutas, debe tener la siguiente estructura:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ___RoutingModule } from './___-routing.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ___RoutingModule
    ]
})
export class ___Module { }
```

### Componentes de los módulos recién creados

Para poder configurar las rutas, necesitamos que cada módulo interno del módulo Protected, contenga los componentes que van a actuar como vistas en cada ruta (por el momento solo vamos a tener las vistas de listar). Por tal motivo usamos los siguientes comandos:

```txt
ng g c protected/modules/dashboard/pages/dashboard --skip-tests -is
```

```txt
ng g c protected/modules/equipment/pages/list --skip-tests -is
```

```txt
ng g c protected/modules/loan/pages/list --skip-tests -is
```

```txt
ng g c protected/modules/laboratory/pages/list --skip-tests -is
```

```txt
ng g c protected/modules/tool-experiment/pages/list --skip-tests -is
```

```txt
ng g c protected/modules/users/pages/list --skip-tests -is
```

```txt
ng g c protected/modules/statistics/pages/globals --skip-tests -is
```

```txt
ng g c protected/modules/report/pages/generate --skip-tests -is
```

Teniendo estos primeros componentes, podemos regresar a los archivos de rutas para poder estables los componentes dependiendo las rutas hijas:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ____Component } from './pages/____/____.component';


const routes: Routes = [
    {
        path: '',
        component: ____Component
    },
    {
        path: '**',
        redirectTo: '',
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ___RoutingModule { }
```

### protected-routing.module.ts - Rutas hijas del módulo Protected

Vamos a crear un archivo para las rutas del módulo Protected. Es importante recordar que este módulo también va a actuar como rutas padres para sus módulo internos, por lo tanto, para optimizar el rendimiento de la aplicación, volvemos a usar el concepto de LazyLoad. El archivo de rutas lo creamos con el siguiente comando:

```txt
ng g m protected/protected-routing --flat
```

Antes de configurar las rutas, creamos un componente que va a albergar el routerOutlet del todo el módulo. Para ello usamos el siguiente comando:

```txt
ng g c protected/pages/main --skip-tests -is
```

Dentro del template de MainComponent, vamos a escribir lo siguiente:

```html
<router-outlet></router-outlet>
```

Dentro del archivo generado (`src/app/protected/protected-routing.module.ts`), vamos a crear el arreglo con las rutas y la carga perezosa de sus módulos internos. Luego las cargamos como rutas hijas mediante el método `.forChild()` de `RouterModule`:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';


const protectedRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'equipment',
                loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)
            },
            {
                path: 'loan',
                loadChildren: () => import('./modules/loan/loan.module').then(m => m.LoanModule)
            },
            {
                path: 'laboratory',
                loadChildren: () => import('./modules/laboratory/laboratory.module').then(m => m.LaboratoryModule)
            },
            {
                path: 'tool-experiment',
                loadChildren: () => import('./modules/tool-experiment/tool-experiment.module').then(m => m.ToolExperimentModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'statistics',
                loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: ''
    }
]


@NgModule({
    imports: [RouterModule.forChild(protectedRoutes)],
    exports: [RouterModule]
})
export class ProtectedRoutingModule { }
```

Posteriormente, dentro de la propiedad de importación del decorador `@NgModule` de `ProtectedModule`, declaramos la clase con las rutas del módulo:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ProtectedRoutingModule
    ]
})
export class ProtectedModule { }
```

## Visualizar todas las vistas actuales

Dentro del template `src/app/app.component.html` ponemos algunos Anchor Tags con el atributo `routerLink`, para poder viajar a las diferentes rutas del proyecto. Siempre es importante recordar que todo lo que hagamos en las vistas, se va a ver reflejado en la sección donde se ubica el `router-outlet`.

```html
<ul>
    <li><a routerLink="/auth/login">Ir a Login</a></li>
    <li><a routerLink="/auth/register">Ir a register</a></li>
    <li><a routerLink="/dashboard">Dashboard</a></li>
    <li><a routerLink="/equipment">Equipos</a></li>
    <li><a routerLink="/loan">Préstamos</a></li>
    <li><a routerLink="/laboratory">Laboratorios</a></li>
    <li><a routerLink="/tool-experiment">Herramientas y Experimentos</a></li>
    <li><a routerLink="/users">Usuarios</a></li>
    <li><a routerLink="/statistics">Estadísticas</a></li>
    <li><a routerLink="/report">Reportes</a></li>
</ul>

<router-outlet></router-outlet>
```

## Referencias

[Angular - RouterOutlet](https://docs.angular.lat/api/router/RouterOutlet 'RouterOutlet')
[Angular - Carga Diferida](https://docs.angular.lat/guide/lazy-loading-ngmodules 'Carga Diferida - LazyLoad')
