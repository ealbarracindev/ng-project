import { AbstractControl, ValidationErrors } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) : ValidationErrors | null {
        let password = AC.get('password');
        let confirmPass = AC.get('confirmPassword');
        if (password != null && confirmPass != null) {
            if(confirmPass.touched || confirmPass.dirty) {
                let verifyPassword = confirmPass.value;   

                if(password.value != verifyPassword) {
                    confirmPass.setErrors( {MatchPassword: true} )
                } else {
                    return null
                }
            }
        }        
        return null;
    }
}