import { Component, OnInit } from '@angular/core';
import { UserRoles } from '../../services/user.service';
import { MatDialogRef } from '@angular/material';

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

  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    if (this.data.confirmationPassword === this.data.Password) {
      delete this.data.confirmationPassword;
      this.dialogRef.close(this.data);
    }
  }

}
