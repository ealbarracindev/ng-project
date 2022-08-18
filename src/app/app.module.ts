import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';


import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getPaginatorIntl } from './core/models/custom-mat-paginatorIntl';

import { AppComponent } from './app.component';

import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { LoggerModule } from 'ngx-logger';
import { environment } from '@env/environment';
import { LayoutComponent } from './components/layout/layout.component';
import { CoreModule } from './core/core.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    BreadcrumbsComponent   
  ],
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,          
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LayoutModule,
    // core
    CoreModule,  
    // logger integrate backend
    LoggerModule.forRoot({
      //serverLoggingUrl: `${environment.API_URL}/v1/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel      
    }),    
    // material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSlideToggleModule,

  ],
  exports:[
    BreadcrumbsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    //fecha
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['L', 'LL'],
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MM/YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
