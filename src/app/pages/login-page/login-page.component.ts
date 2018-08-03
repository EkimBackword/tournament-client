import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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

}
