import { Injectable, NgZone } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar,
    private readonly zone: NgZone) { }

// public openSnackBar(message: string) {
//     this.snackBar.open(message, '', {
//         duration: 5000
//     });
// }
default(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'info-snackbar'
    });
  }

  success(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'success-snackbar'
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'warn-snackbar'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
  
  private show(message: string, configuration: MatSnackBarConfig) {
      // Need to open snackBar from Angular zone to prevent issues with its position per
      // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
      this.zone.run(() => this.snackBar.open(message, undefined, configuration));
  }
}
