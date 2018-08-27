import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SignUpDialogComponent } from '../../shared/sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  login: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  async Login() {
    try {
      await this.userService.LogIn(this.login, this.password);
      this.router.navigate(['/tournaments']);
    } catch (e) {
      console.warn(e);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      height: '600px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.SignUp(result);
      }
    });
  }

}
