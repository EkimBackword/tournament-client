import { Component, OnInit } from '@angular/core';
import { UserRoles, UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.less']
})
export class SignUpDialogComponent implements OnInit {

  data = {
    Login: '',
    Password: '',
    confirmationPassword: '',
    FIO: '',
    BattleTag: '',
    Role: UserRoles.user,
  };

  constructor(
    private userService: UserService,
    private uiStateService: UiStateService,
    public dialogRef: MatDialogRef<SignUpDialogComponent>
  ) { }

  ngOnInit() {
  }

  async closeDialog() {
    try {
      if (this.data.confirmationPassword === this.data.Password) {
        await this.userService.SignUp(this.data);
        this.uiStateService.showMessage({
          title: 'Регистрация успешно завершена',
          message: 'Теперь вы зарегистрированы, как участник!',
          type: 'success'
        });
        this.dialogRef.close();
      } else {
        this.uiStateService.showMessage({
          title: 'Не корректные данные',
          message: 'Проверьте совпадает ли пароль и его подтверждение',
          type: 'warn'
        });
      }
    } catch (response) {
      this.uiStateService.showMessage({
        title: 'Ошибка при регистрации',
        message: response.error.message,
        type: 'error'
      });
    }
  }

}
