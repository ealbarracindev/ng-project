import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { User, UserInfo } from '@core/models/auth.model';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from '@core/services/theme.service';

import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { NotificationCountResult } from '@core/models/notification-count-result';
import { NotificationResult } from '@core/models/notification-result';
import { NotificationService } from '@coreservices/notification.service';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  start: string='menu';
  end: string='close';
  colorStart: string='';
  colorEnd: string='';
  animate: boolean=false;
  animateFromParent?: boolean = false;
  isDarkMode: boolean;
  opened = true;
  userName: string='';
  isAdmin: boolean=false;
  //===========================
  public notification: NotificationCountResult = new NotificationCountResult(0);  
  messages: Array<NotificationResult>=new Array<NotificationResult>();  
  errorMessage = '';  
  //===========================
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  /**
   *
   */
  constructor(
              private themeService: ThemeService,
              private authService:AuthService,
              private notificationService: NotificationService
              ) {
                // this.themeService.initTheme();
                this.isDarkMode = this.themeService.isDarkMode();
                
  }

  ngOnInit() {
    //console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
    const user = this.authService.currentUser();
    if(user){
      this.userName = user.fullName;
    }
    //this.initConnection();
  }
  
  initConnection(){
    const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(`${ env.API_URL }/notify`)  
      .build();  
  
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err:any) {  
      return console.error(err.toString());  
    }); 

    connection.on("BroadcastMessage", () => {  
      /**
       * esta llamada a la api se ejecuta desde el server socket
       * con signalR, cada vez que se registra algo se informa a 
       * los usuarios conectados
       */  

      this.getNotificationCount(); 
    });  
  }

  //==============Mensajes mediante socket
  getNotificationCount() {  
    this.notificationService.getNotificationCount().subscribe(  
      (resp:any) => {  
        this.notification = resp.data;  
      },  
      error => this.errorMessage = <any>error  
    );  
  }  
  
  getNotificationMessage() {  
    this.notificationService.getNotificationMessage().subscribe(  
      (messages:any) => {  
        this.messages = messages.data;  
      },  
      error => this.errorMessage = <any>error  
    );  
  }  
  
  // deleteNotifications(): void {  
  //   if (confirm(`Are you sure want to delete all notifications?`)) {  
  //     this.messageService.deleteNotifications()  
  //       .subscribe(  
  //         () => {  
  //           this.closeModal();  
  //         },  
  //         (error: any) => this.errorMessage = <any>error  
  //       );  
  //   }  
  // }


  //==========================================


  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  toggle() {
    if(!this.animateFromParent) this.animate = !this.animate;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }


//   user: User | null = null;

//   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
//     .pipe(
//       map(result => result.matches),
//       shareReplay()
//     );

//   constructor(
//     private breakpointObserver: BreakpointObserver,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.authService.authState$
//     .subscribe(user => {
//       this.user = user;
//     })
//   }

//   change() {
//     this.authService.setAuthState({
//       ...this.user as User,
//       name: 'javi-SC'
//     });
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }

}
