import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    /* This is a regular expression that is used to validate the name and surname. */
    public patternNameOrSurname: string = '/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g'

    /* This is a regular expression that is used to validate the email. */
    public patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'


    constructor() { }


    /**
     * If the password and confirm password fields don't match, return an error
     * @param {string} password - The name of the password field.
     * @param {string} confirmPassword - string
     * @returns The validation function is being returned.
     */
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