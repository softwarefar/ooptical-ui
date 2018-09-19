import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable({providedIn: 'root'})
export class ToasterService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  info(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  error(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
