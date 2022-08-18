import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from '@coremodels/error.model';
import { PasswordValidation } from '@coremodels/password-validator';
import { AuthService } from '@coreservices/auth.service';
import { MessageService } from '@coreservices/message.service';
import { IRegister } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /********************** */
  private email: string='';
  loggedIn = false;
  loading: boolean=false;
  titleAlert:string= 'Este campo es requerido';
  successfulSave: boolean=false;
  errors: string[]=[];
  minLength:number=4;
  /********************* */
  formRegister!: FormGroup;
  patternPass:string='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackService: MessageService) { }

  ngOnInit() {
    this.myformBuilder();
  }

  private myformBuilder():void{
    this.formRegister = this.fb.group({
      'email': ['', [Validators.required,Validators.pattern(this.patternPass)]],
      'password': ['', [Validators.required,Validators.minLength(this.minLength)]],
      'confirmPassword': ['', [Validators.required,Validators.minLength(this.minLength)]],      
    },{validator: PasswordValidation.MatchPassword});

    let input1 = this.formRegister.get('email');
    if (input1 != null) {
        input1.valueChanges.subscribe((val: string) => { this.email = val.toLowerCase(); });
    }
  }

  /**
   * Methods publics
   */
   hide = true;
  //  passwordMatchValidator(password: string): ValidatorFn {
  //    return (control: FormControl) => {
  //      if (!control || !control.parent) {
  //        return null;
  //      }
  //      return control.parent.get(password).value === control.value ? null : { mismatch: true };
  //    };
  //  }

  Register() {
    this.loading=true
    this.errors=[]
    const newregister: IRegister = {
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      confirmPassword: this.formRegister.value.confirmPassword
    };
    
    this.authService.register(newregister)
    .subscribe({
      next: (resp:any)=>{
        if(resp){
          this.loading=false
          this.snackService.success("Registro exitoso")
          this.router.navigate(['/user/login']);
        }else{
          this.loading=false
          this.snackService.error('No se pudo completar el regsitro de su cuenta')
        }        
      },
      error:(error:any)=>{
        this.loading=false
        //this._handleErrorResponse(error)
      }
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }
  
  /**
   * Custom handler error
   * @param error 
   */
  // private _handleErrorResponse(error:HttpErrorResponse) { 
  //   let errors: Errors[]=[];
  //   if(error.status===404){
  //       this.snackService.warn('msje: '+error.message+', status: '+error.status);
  //   }        
  //   errors=error.error;        
  //   for(let i = 0; i < errors?.length; i++) {              
  //       var dato= errors[i]
  //       this.snackService.error('msje details: '+ dato.detail +', status: '+ dato.status);
  //   }   
  // }

  hasError(nombreControl: string, validacion: string):boolean {
    const control = this.formRegister.get(nombreControl);
    if(control!=null)
      return control.hasError(validacion);

    return false;
  }

  // resetPassword() {
  //   this.loading = true;
  //   this.authService.passwordResetRequest(this.email)
  //     .subscribe(
  //       results => {
  //         this.router.navigate(['/auth/login']);
  //         this.snackService.info('Password verification mail has been sent to your email address.');
  //       },
  //       error => {
  //         this.loading = false;
  //         this.snackService.error(error.error);
  //       }
  //     );
  // }

  
}