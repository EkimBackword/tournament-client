import { UserService, IUser } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UiStateService } from '../../../services/ui-state.service';

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.less']
})
export class TournamentsPageComponent implements OnInit {
  profile: IUser = null;
  isUserInvisible: boolean;
  telegramRequest: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private uiState: UiStateService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.profile = await this.userService.GetProfile({ withTournaments: true });
    this.isUserInvisible = false;
  }

  toogleUserInvisible() {
    this.isUserInvisible = !this.isUserInvisible;
  }

  async logout() {
    await this.userService.LogOut();
    this.router.navigate(['/login']);
  }

  async GetTelegramRequestCode() {
    this.telegramRequest = await this.userService.telegramRequest();
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `/request ${this.telegramRequest}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.uiState.showMessage({
      title: 'Копирование',
      message: 'Текст скопирован! Осталось отправить в телеграм. ',
      type: 'success'
    });
  }

}
