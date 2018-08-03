import { UserService, IUser } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less']
})
export class TournamentsPageComponent implements OnInit {
  profile: IUser = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.profile = await this.userService.GetProfile({ withTournaments: true });
  }

  async logout() {
    await this.userService.LogOut();
    this.router.navigate(['/login']);
  }

}
