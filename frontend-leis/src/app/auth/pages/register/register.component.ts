import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { Router } from '@angular/router';
import { ToastrNotificationService } from '../../../services/toastr-notification.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup = this._formBuilder.group(
        {
            name: [, [Validators.required/* , Validators.pattern(this._validatorsService.patternNameOrSurname) */]],
            surname: [, [Validators.required/* , Validators.pattern(this._validatorsService.patternNameOrSurname) */]],
            email: [, [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.patternEmail)]],
            password: [, [Validators.required, Validators.minLength(8)]],
            confirm_password: [, [Validators.required]]
        },
        {
            validators: [this._validatorsService.equalsPassword('password', 'confirm_password')]
        }
    )

    public showPassword: boolean = false
    public showConfirmPassword: boolean = false


    constructor(private _formBuilder: FormBuilder, private _router: Router, private _validatorsService: ValidatorsService, private _toastr: ToastrNotificationService) { }


    ngOnInit(): void {
        this.registerForm.reset({
            name: 'Carlos David',
            surname: 'Páez Ferreira',
            email: 'carlos.paezf@usantoto.edu.co',
            password: 'password',
            confirm_password: 'password'
        })
    }


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
