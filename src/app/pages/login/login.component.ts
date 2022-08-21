import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
// import { Title } from '@angular/platform-browser';

import { AuthService } from '@core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Errors } from '@coremodels/error.model';
import { MessageService } from '@coreservices/message.service';
import { catchError } from 'rxjs';
import { LoginRta } from '../../core/models/auth.model';

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
    private snackService: MessageService,
    // private title: Title
  ) {} 

  onSubmit(): void {
    if (this.form.valid) {
      this.loading=true;
      const { email, password } = this.form.getRawValue();
      this.auth.login(email, password)
      .subscribe({
        next: (value:LoginRta) => {
          this.loading=false
          this.router.navigate(['/dashboard']);        
        },
        error: (error:any) => {
          this.loading = false;          
        }
      });
    }
  }
  
  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }

  register(){
    this.router.navigate(['/auth/register']);
  }  
}
