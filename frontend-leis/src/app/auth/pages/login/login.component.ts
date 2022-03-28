import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrNotificationService } from 'src/app/services';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    /* This is a regular expression that is used to validate the email. */
    private _patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

    /* Creating a form group with two form controls. */
    public loginForm: FormGroup = this._formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this._patternEmail)]],
        password: ['', [Validators.required, Validators.minLength(5)]]
    })

    /* A flag to show or hide the password. */
    public showPassword: boolean = false


    /**
    * The constructor function is used to initialize the component. Called automatically when the component is created. 
    * 
    * The constructor function is used to inject dependencies into the component. 
    * @param {FormBuilder} _formBuilder - The FormBuilder is a service that allows us to build our forms easily.
    * @param {Router} _router - Router: This is the router service provided by Angular. We will use this to navigate to the login page.
    * @param {ToastrNotificationService} _toastr - This is the toastr service.
    */
    constructor(private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrNotificationService) { }


    ngOnInit(): void {
        this.loginForm.reset({
            email: 'carlos.paezf@usantoto.edu.co',
            password: 'password'
        })
    }


    /**
     * Get the error message for the email field
     * @returns The error message.
     */
    get emailError(): string {
        const email = this.loginForm.get('email')
        if (email!.getError('required')) {
            return 'El email es obligatorio'
        } else if (email!.getError('pattern')) {
            return 'El email debe ser un correo válido'
        }
        return ''
    }


    /**
     * If the field is invalid and the field is touched, return true
     * @param {string} field - string
     * @returns The value of the form control.
     */
    public isInvalidField = (field: string) => {
        return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched && this.loginForm.get(field)?.invalid
    }


    /**
     * Toggle the value of this.showPassword
     */
    public togglePassword = () => this.showPassword = !this.showPassword


    /**
     * If the form is invalid, mark all fields as touched
     * @returns Nothing.
     */
    public login = () => {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }
        this._toastr.success(`Bienvenido a LEIS`, 'Bienvenido')
        this.loginForm.reset()
        this._router.navigate(['/dashboard'])
    }
}