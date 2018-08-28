import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DefaultSnackBarComponent } from '../shared/default-snack-bar/default-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  protected defaultConfig: MatSnackBarConfig;

  constructor(protected snackBar: MatSnackBar) {
    this.defaultConfig = {
      duration: 2000,
      panelClass: ['snack-bar--no-padding'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    };
  }

  showMessage(data: IMessageData, options?: MatSnackBarConfig) {
    const _config = Object.assign({}, this.defaultConfig, options, { data });
    return this.snackBar.openFromComponent(DefaultSnackBarComponent, _config);
  }
}

export interface IMessageData {
  title: string;
  message: string;
  type: MessageDataType;
}

export declare type MessageDataType = 'success' | 'warn' | 'error';
