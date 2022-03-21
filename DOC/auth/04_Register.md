# Register

Dentro de esta vista volvemos a usar Formularios Reactivos, por lo que debemos asegurarnos que dentro del módulo de `auth.module.ts` tengamos la importación de los formularios reactivos:

```ts
...
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    ...,
    imports: [
        ...,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
```

## Servicio de validaciones personales

Cuando creamos el objeto literal de `FormGroup`, teniendo como propiedades los campos de nuestro formulario, nosotros podemos determinar 3 elementos dentro del arreglo que se le asigna a la propiedad. El primer valor es el valor inicial del campo, el segundo son las validaciones síncronas y el tercero son validaciones asíncronas. Dentro del segundo elemento, nosotros podemos usar las validaciones propias de Angular, o crear nuestras propias validaciones.

Queremos tener nuestras propias validaciones, por lo que creamos un servicio con el siguiente comando:

```txt
ng g s auth/services/validators --skip-tests
```

Dentro del servicio, vamos a establecer como propiedades algunas expresiones regulares a usar dentro de nuestras validaciones del formulario, y también tenemos un método para comparar los valores ingresados de la contraseña y su confirmación. Como las validaciones deben retornar los errores al fallar, necesitamos retornar una función dentro del método que pueda llegar a retornar el error o un null, los cuales ingresamos al conjunto de errores de un campo especifico del formulario.

```ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {
    
    public patternNameOrSurname: string = '/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g'
    
    public patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'


    constructor() { }


    public equalsPassword = (password: string, confirmPassword: string) => {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const pass = formGroup.get(password)?.value
            const confirmPass = formGroup.get(confirmPassword)?.value

            if (pass !== confirmPass) {
                formGroup.get(confirmPassword)?.setErrors({ equalsPassword: false })
                return { equalsPassword: false }
            }

            formGroup.get(confirmPassword)?.setErrors(null)
            return null
        }
    }
}
```

## Clase del componente

Lo primero por hacer es definir los campos del formulario junto con sus validaciones, por lo que necesitamos hacer la inyección de dependencias de 2 servicios, `FormBuilder` para la creación del formulario reactivo y `ValidatorsService` para las validaciones personalizadas.

Dentro de la definición del objeto literal del formulario, tenemos un primer objeto con las propiedades del formulario, y un segundo objecto con las validaciones personalizadas que se inyectan desde nuestro servicio.

```ts
...
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';


...
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup = this._formBuilder.group(
        {
            name: [, [Validators.required]],
            surname: [, [Validators.required]],
            email: [, [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.patternEmail)]],
            password: [, [Validators.required, Validators.minLength(8)]],
            confirm_password: [, [Validators.required]]
        },
        {
            validators: [this._validatorsService.equalsPassword('password', 'confirm_password')]
        }
    )


    constructor(private _formBuilder: FormBuilder, private _validatorsService: ValidatorsService) { }


    ngOnInit(): void {
        this.registerForm.reset()
    }
}

```

Luego podemos hacer un método get para personalizar los mensajes de error de cualquiera de los campos. Por ejemplo, mostrar un mensaje especifico dependiendo de los errores generados en el campo del correo. A esto se le acompaña una función que verifica si el campo que se toca tiene errores y es invalido, con el fin de retornar un boolean que usara de manera condicional en el template:

```ts
...
export class RegisterComponent implements OnInit {

    ...
    get emailError(): string {
        const email = this.registerForm.get('email')
        if (email!.getError('required')) {
            return 'El email es obligatorio'
        } else if (email!.getError('pattern')) {
            return 'El email debe ser un correo valido'
        }
        return ''
    }


    public isInvalidField = (field: string) => {
        return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched && this.registerForm.controls[field].invalid
    }
}
```

También tenemos una función que nos permite hacer un toggle entre hacer visible u ocultar la contraseña, tomando el cuenta el campo a alterar.

```ts
...
export class RegisterComponent implements OnInit {

    ...
    public showPassword: boolean = false
    public showConfirmPassword: boolean = false
    
    ...
    public togglePassword = (field: string): boolean => {
        if (field === 'password') {
            return this.showPassword = !this.showPassword
        }
        return this.showConfirmPassword = !this.showConfirmPassword
    }
}
```

Por último tenemos una función para cuando se presione el botón de register. Por el momento su lógica se centrará en verificar el estado del formulario, y en hacer la redirección a otra vista. Tenemos que hacer la inyección de dependencias para el Router y para las notificaciones mediante el servicio personalizado de Toastr.

```ts
...
import { Router } from '@angular/router';
import { ToastrNotificationService } from '../../../services/toastr-notification.service';


...
export class RegisterComponent implements OnInit {

    ...
    constructor(..., private _router: Router, private _toastr: ToastrNotificationService) { }

    ...
    public togglePassword = (field: string): boolean => {
        if (field === 'password') {
            return this.showPassword = !this.showPassword
        }
        return this.showConfirmPassword = !this.showConfirmPassword
    }


    public register = (): void => {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched()
            this._toastr.error('Revisa la información ingresada', 'Error')
            return
        }
        this._toastr.success(`Bienvenido ${this.registerForm.get('name')?.value}`, 'Registro Exitoso')
        this._router.navigate(['/dashboard'])
        this.registerForm.reset()
    }
}
```

### Template del componente

Al igual que dentro del componente de Login, el template de nuestro formulario de registro se debe asociar al objeto literal de la clase, mediante la propiedad `[formGroup]`.

```html
<form method="post" [formGroup]="registerForm" autocomplete="off">
...
</form>
```

Lo mismo pasa con los inputs, los debemos asociar con las propiedades del objeto mediante `formControlName`

```html
<input type="text" class="form-control" formControlName="name" placeholder="Ingresa tu(s) nombre(s)" >
```

Los errores se muestran de manera condicional cuando la función para validar los campos retorna un true, además de que se puede hacer una interpolación al mensaje a mostrar, si hacemos errores personalizados.

```html
<span class="form-text text-danger" *ngIf="isInvalidField('email')">
    {{ emailError }}
</span>
```

Para asociar una función a un botón cuando se hace click, debemos llamar el evento `(click)` y pasarle la expresión o método:

```html
<button type="submit" (click)="register()" class="btn btn-primary form__btn">
    Regístrate
</button>
```

Para tener un enlace con el que se pueda hacer redirección, necesitamos la propiedad `[routerLink]` y entregarle un arreglo con la ruta a mostrar:

```html
<a [routerLink]="['/auth/login']" routerLinkActive="router-link-active">
    <label class="mx-2">Inicia sesión aquí</label>
</a>
```
