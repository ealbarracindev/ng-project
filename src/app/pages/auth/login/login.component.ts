import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
// import { Title } from '@angular/platform-browser';

import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Errors } from 'src/app/core/models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  hide:boolean = true;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackService: NotificationService,
    // private title: Title
  ) {
    // this.form.controls.email.setValue(12);
    // title.setTitle('Login Page');
  }

  HandleErrorResponse(error:HttpErrorResponse) { 
    let errors: Errors[]=[];
    if(error.status===404){
        this.snackService.warn('msje: '+error.message+', status: '+error.status);
    }
    errors=error.error        
    for(let i = 0; i < errors?.length; i++) {              
        var dato= errors[i]
        this.snackService.error('msje details: '+dato.detail+', status: '+dato.status);
    }   
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading=true;
      const { email, password } = this.form.getRawValue();
      this.auth.login(email, password)
      .subscribe(() => {
        this.loading=false
        this.router.navigate(['/dashboard']);
      }),(error:any)=>{
          console.log('error login--> ',error);
          this.snackService.error('No se pudo completar la verificación');
          this.HandleErrorResponse(error)
          this.loading = false;
      };
    }
  }
  
  register(){
    this.router.navigate(['/register']);
  }
}
