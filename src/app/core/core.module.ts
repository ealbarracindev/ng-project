import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MediaMatcher } from '@angular/cdk/layout';

import { MatSnackBarModule } from '@angular/material/snack-bar';

//import { NGXLogger } from 'ngx-logger';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { throwIfAlreadyLoaded } from './utils/module-import.guard';
// import { throwIfAlreadyLoaded } from './guards/module-import.guard';
// import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    //AdminGuard,
    MediaMatcher,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SpinnerInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: GlobalErrorHandlerInterceptor,
    //   multi: true
    // },
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    //{ provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage }
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}