import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // private token: string = '';
  // email: string = '';
  // form!: FormGroup;
  // loading: boolean=false;
  // hideNewPassword: boolean;
  // hideNewPasswordConfirm: boolean;

  // constructor(private activeRoute: ActivatedRoute,
  //   private router: Router,
  //   //private authService: AuthenticationService,
  //   private snackService: NotificationService,
  //   private titleService: Title) {

  //   this.titleService.setTitle('angular-material-template - Password Reset');
  //   this.hideNewPassword = true;
  //   this.hideNewPasswordConfirm = true;
  // }

  // ngOnInit() {
  //   this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
  //     this.token = params.get('token');
  //     this.email = params.get('email');

  //     if (!this.token || !this.email) {
  //       this.router.navigate(['/']);
  //     }
  //   });

  //   this.form = new FormGroup({
  //     newPassword: new FormControl('', Validators.required),
  //     newPasswordConfirm: new FormControl('', Validators.required)
  //   });
  // }

  // resetPassword() {

  //   const password = this.form.get('newPassword').value;
  //   const passwordConfirm = this.form.get('newPasswordConfirm').value;

  //   if (password !== passwordConfirm) {
  //     this.snackService.warn('Passwords do not match');
  //     return;
  //   }

  //   this.loading = true;

  //   // this.authService.passwordReset(this.email, this.token, password, passwordConfirm)
  //   //   .subscribe(
  //   //     data => {
  //   //       this.snackService.warn('Your password has been changed.');
  //   //       this.router.navigate(['/auth/login']);
  //   //     },
  //   //     error => {
  //   //       this.snackService.error(error.error);
  //   //       this.loading = false;
  //   //     }
  //   //   );
  // }

  // cancel() {
  //   this.router.navigate(['/']);
  // }
}
