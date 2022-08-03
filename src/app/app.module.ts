import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
//import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';

import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './components/layout/layout.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent    
  ],
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,          
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
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
