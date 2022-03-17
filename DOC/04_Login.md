# Vista de Login

Vamos a manejar el componente de login, que se encuentra dentro de `src/app/auth/pages`. Como tenemos un formulario para ingresar, vamos a hacer uso de los `Formularios Reactivos`, los cuales nos permiten tener un mayor control sobre los campos.

## Formularios Reactivos

La idea de tener formularios reactivos dentro de nuestro proyecto, es poder tener menos HTML en el componente y tener la mayor parte de la lógica dentro de la clase del componente. Para poder implementar los formularios reactivos, necesitamos importar `ReactiveFormsModule` dentro del decorador `NgModule` del módulo a usar, en este caso `src/app/auth/auth.module.ts`:

```ts
import { ReactiveFormsModule } from '@angular/forms';
...


@NgModule({
    ...,
    imports: [
        ...,
        ReactiveFormsModule,
        ...
    ]
})
export class AuthModule { }
```

## login.component.ts

### FormGroup

Comenzamos haciendo una inyección de dependencias de FormBuilder, con el fin de tener un código más limpio al usar la notación de objecto literal:

```ts
...
import { FormBuilder } from '@angular/forms';


@Component({ ... })
export class LoginComponent implements OnInit {

    constructor(private _formBuilder: FormBuilder) { }
    ...
}
```

Luego podemos definir el contenido del formulario a mostrar, y aplicamos un reset al formulario al principio de su tiempo de vida, dentro del método implementado de la interfaz `OnInit`:

```ts
...
import { ..., FormGroup, Validators } from '@angular/forms';


...
export class LoginComponent implements OnInit {

    private _patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

    public loginForm: FormGroup = this._formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this._patternEmail)]],
        password: ['', [Validators.required, Validators.minLength(5)]]
    })

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm.reset()
    }
}
```

Dentro del template (HTML), creamos el formulario que vamos a manipular. Es importante asociar el formulario del template mediante la directiva `[formGroup]`, con el grupo de valores establecidos en la lógica del componente:

```html
<form [formGroup]="loginForm" autocomplete="off">
    ...
</form>
```

### Inputs

Ahora debemos asociar los inputs con los elementos del grupo del formulario mediante la directiva `formControlName`, como por ejemplo asociar el input del email con la propiedad del `formGroup` del componente:

```html
<input type="text" class="form-control" formControlName="email" placeholder="Ingresa tu Email">
```

### Errores

Dentro de las propiedades del objeto del formulario, tenemos algunas validaciones síncronas, las cuales de no cumplirse tornan invalido el formulario y retornan un error. Lo que vamos a hacer es tener un método get para retornar un string dependiendo el error, y luego tenemos un un método que determina si un campo es invalido al cumplir las condiciones de tener errores, haber tocado el input y en caso de que el campo genere un error de invalidez:

```ts
export class LoginComponent implements OnInit {
    ...
    get emailError(): string {
        const email = this.loginForm.get('email')
        if (email!.getError('required')) {
            return 'El email es obligatorio'
        } else if (email!.getError('pattern')) {
            return 'El email debe ser un correo válido'
        }
        return ''
    }


    isInvalidField = (field: string) => {
        return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched && this.loginForm.get(field)?.invalid
    }
}
```

La manera en que visualmente mostramos los errores en el template, es usando la directiva `*ngIf` usando el método para verificar el campo y mostrar un error en el span cuando la función retorne `true`. En el caso del input del email, el error es dinámico, y en caso de la contraseña, el error es único:

```html
<span class="form-text text-danger" *ngIf="isInvalidField('email')">
    {{ emailError }}
</span>
```

```html
<span class="form-text text-danger" *ngIf="isInvalidField('password')">
    Se debe ingresar una contraseña
</span>
```

### Mostrar u Ocultar la contraseña

Vamos a añadir la funcionalidad de mostrar u ocultar el valor de la contraseña que se está ingresando, para ello creamos una variable booleana y un método para cambiar su valor:

```ts
export class LoginComponent implements OnInit {
    ...
    public showPassword: boolean = false

    ...
    togglePassword = () => this.showPassword = !this.showPassword
}
```

Dentro del template establecemos el tipo del input de manera condicional con un operador ternario, y un botón al que cuando se le hace click se ejecuta la función del toggle. El icono también tiene la clase de manera condicional dependiendo el valor de la variable booleana.

```html
<input [type]="showPassword ? 'text' : 'password'" class="form-control" formControlName="password" placeholder="Ingresa tu Contraseña">
<button type="button" class="input__show" (click)="togglePassword()">
    <i [class]="showPassword ? 'pi pi-eye-slash': 'pi pi-eye'"></i>
</button>
```

### Botones de Inicio de Sesión

El formulario será de tipo POST, y a los botones de ingreso se la asignará una función especifica al hacerle click.

```html
<form method="post" ...>
    ...
    <div class="row mt-5">
        <!-- Inicio de Sesión con Email y Password -->
        <div class="col-sm-12 mb-3">
            <button type="submit" (click)="login()" class="btn btn-primary form__btn">
                Iniciar Sesión
            </button>
        </div>
        
        <!-- Inicio de Sesión con Google -->
        <div class="col-sm-12">
            <button class="btn btn-dark form__btn">
                <i class="pi pi-google mx-2"></i>
                O inicia sesión con Google
            </button>
        </div>
    </div>
</form>
```

La función de `login` dentro del componente debe analizar si el formulario es invalido, puesto que en ese estado debemos 'tocar' todos los campos del formulario para mostrar los errores actuales. En caso de todo ir bien, se aplica la lógica de negocio para el ingreso. También debemos tener en cuenta de inyectamos las dependencias de Router para poder manejar las rutas:

```ts
...
import { Router } from '@angular/router';


...
export class LoginComponent implements OnInit {
    ...
    constructor(..., private _router: Router) { }

    ...
    login = () => {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }
        this._toastr.success(`Bienvenido a LEIS`, 'Bienvenido')
        this.loginForm.reset()
        this._router.navigate(['/dashboard'])
    }
}
```

## Toastr

Como vemos en el método de login, estamos usando un toastr para poder mostrar un mensaje de bienvenida. Lo primero que debemos hacer es instalar el paquete de NGX-Toastr:

```txt
npm i ngx-toastr --save
```

```txt
npm i @angular/animations --save
```

Dentro del archivo `angular.json` necesitamos añadir los estilos de la nueva librería, y volver a recargar el server del proyecto para que tome los cambios:

```json
{
    ...,
    "projects": {
        "frontend-leis": {
            ...,
            "architect": {
                "build": {
                    ...,
                    "options": {
                        "styles": {
                            "src/styles.css",
                            ...,
                            "node_modules/ngx-toastr/toastr.css"
                        }
                    }
                }
            }
        }
    }
}
```

Dentro del archivo `app.module.ts` tenemos que importar un módulo de animaciones para el navegador, y el módulo de Toastr que se establece en la raíz del proyecto:

```ts
...
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    ...,
    imports: [
        ...,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
    ...
})
export class AppModule { }
```

Luego usamos el siguiente comando para crear un servicio con el que globalizamos algunos de los métodos de el paquete anteriormente instalado.

```txt
ng g s services/toastr-notification --skip-tests
```

Los servicios tienen un decorador llamado `@Injectable({})`, y por defecto provee el servicio a la raíz del proyecto. Luego dentro del constructor del servicio, se hace una inyección de dependencias del servicio de Toastr y poder usar sus métodos.

```ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class ToastrNotificationService {

    public params = {
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000
    }

    constructor(private _toastr: ToastrService) { }

    public success = (message: string, title: string, params: any = this.params): void => {
        this._toastr.success(message, title, params)
    }
}
```

Luego, dentro de la clase del componente hacemos la inyección de nuestro servicio y de esa manera usar sus nuevas funciones:

```ts
...
import { ToastrNotificationService } from '../../../services/toastr-notification.service';


...
export class LoginComponent implements OnInit {
    ...
    constructor(..., private _toastr: ToastrNotificationService) { }

    ...
    login = () => {
        ...
        this._toastr.success(`Bienvenido a LEIS`, 'Bienvenido')
        ...
    }
}
```

## Estilos CSS

Definimos algunos estilos CSS dentro del archivo `src/styles.css`, con el fin de poder acceder a ellos en toda la aplicación:

```css
/* You can add global styles to this file, and also import other style files */
:root {
    --gold: rgb(199, 160, 2);
}


html, 
body {
    margin: 10px;
    background-color: var(--surface-a);
    font-family: var(--font-family);
}


.text-layout {
    color: var(--text-color)
}


/* --------------- Alineación del contenido --------------- */
.align-row-left,
.align-row-center,
.align-row-right,
.form__auth {
    display: flex;
    justify-content: center;
}


.align-row-left,
.align-row-center,
.align-row-right {
    flex-direction: row;
}


.align-row-left { align-items: left; }
.align-row-center { align-items: center; }
.align-row-right { align-items: right; }



/* --------------- Estilos de los formularios de autenticación --------------- */
.form__auth {
    align-items: center;
    height: 100vh;
}


.form__content {
    margin: 0 400px;
    width: 100%;
}


.flex__input,
.flex__label-input {
    display: flex;
    justify-content: space-between;
}


.flex__input .input__show {
    align-items: center;
    background: var(--text-color);
    display: flex;
    justify-content: center;
    width: 50px;
}

.flex__input .input__show i {
    color: white;
    font-size: 22.5px;
}


.pointer {
    cursor: pointer;
}


.form__btn {
    height: 50px;
    width: 100%;
    font-size: 20px;
}
```

Pero, también tenemos estilos específicos para los componentes. Dichos estilos se encuentra en la hoja de estilos de cada componente, los cuales son importados dentro del decorador `@Component`, en la propiedad `styleUrls` cuando se tiene un archivo, o en la propiedad `style` cuando se tienen estilos inline. Por ejemplo para el componente `<Main />` tenemos el archivo `main.component.css` con los estilos dedicados a dicho componente.
