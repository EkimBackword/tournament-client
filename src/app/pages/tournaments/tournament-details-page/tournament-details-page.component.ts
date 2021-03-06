import { Component, OnInit } from '@angular/core';
import { TournamentService, ITournament, TournamentStatusDescription, TournamentStatusENUM } from '../../../services/tournament.service';
import { UserService, IUser } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddMeDialogComponent, IAddData } from '../../../shared/add-me-dialog/add-me-dialog.component';
import { BanRequestListDialogComponent } from '../../../shared/ban-request-list-dialog/ban-request-list-dialog.component';
import { UiStateService } from '../../../services/ui-state.service';

@Component({
  selector: 'app-tournament-details-page',
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.less']
})
export class TournamentDetailsPageComponent implements OnInit {

  data: IData;
  canEdit = false;
  tournamentId: number;
  tournament: ITournament;
  profile: IUser;
  isMember: boolean;
  isAdmin: boolean;
  showMember: boolean;

  singleData = {
    teams: [ [null, null], [null, null] ],
    results: [[ [], [] ]]
  };

  doubleData = {
    teams: [ [null, null], [null, null] ],
    results: [[[[]]], [], []]
  };

  tournamentStatusDescription = TournamentStatusDescription;

  membersList = [];

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
    private uiState: UiStateService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.showMember = false;
    this.route.params.subscribe(params => {
      this.tournamentId = params['tournamentId'];
      this.load();
    });
  }
  goToTournamentsList() {
    this.router.navigate(['/tournaments']);
  }
  async load() {
    this.profile = await this.userService.GetProfile();
    this.tournament = await this.tournamentService.getTournament(this.tournamentId, true);
    this.membersList = this.tournament.Members.map(member => {
      return `${member.User.BattleTag}:${member.UserID}:${member.DeckList}`;
    });
    this.isMember = this.profile && this.tournament && this.tournament.Members.some(m => m.UserID === this.profile.ID);
    this.isAdmin = this.profile && this.tournament && this.tournament.UserID === this.profile.ID;
    this.data = JSON.parse(this.tournament.JsonData);
    if ( this.data.groups === void 0 ) {
      this.data = {
        groups: [
          { name: 'A', data: this.doubleData },
          { name: 'B', data: this.doubleData },
        ],
        playoff: this.singleData,
        playoffType: 'single'
      };
      await this.updateTournament();
    }
  }
  private async updateTournament() {
    try {
      await this.tournamentService.upadeteTournament(this.tournamentId, this.tournament.Title, JSON.stringify(this.data));
    } catch (response) {
      console.warn(response);
      if (response && response.error) {
        this.uiState.showMessage({
          title: 'Ошибка обновления данных',
          message: response.error.message,
          type: 'error'
        });
      }
    }
  }

  async addGroup() {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z' ];
    if (this.data.groups.length === symbols.length) { return; }
    this.data.groups.push({ name: symbols[this.data.groups.length], data: this.doubleData });
    await this.updateTournament();
  }

  async removeGroup() {
    this.data.groups.pop();
    await this.updateTournament();
  }

  async addPlayoff(isSingle: boolean) {
    this.data.playoff = isSingle ? this.singleData : this.doubleData;
    this.data.playoffType = isSingle ? 'single' : 'double';
    await this.updateTournament();
  }
  async removePlayoff() {
    delete this.data.playoff;
    delete this.data.playoffType;
    await this.updateTournament();
  }

  async SaveOnChange(data: any, item: any, type: 'playoff' | 'group') {
      if (type === 'group') {
        const group = this.data.groups.find(g => g.name === item.name && g.data === item.data);
        group.data = data;
      } else {
        this.data.playoff = data;
      }
      item = data;
      await this.updateTournament();
  }

  async changeState() {
    try {
      this.tournament.Status = this.tournament.Status === TournamentStatusENUM.new ?
      TournamentStatusENUM.start : TournamentStatusENUM.finished;
      await this.tournamentService.upadeteTournament(
        this.tournamentId,
        this.tournament.Title,
        JSON.stringify(this.data),
        this.tournament.Status
      );
    } catch (response) {
      console.warn(response);
      if (response && response.error) {
        this.uiState.showMessage({
          title: 'Ошибка добавления',
          message: response.error.message,
          type: 'error'
        });
      }
    }
  }
  async sendOpponentInfo(array: any[], item: any, type: 'playoff' | 'group') {
    try {
      await this.tournamentService.sendOpponentInfo(
        this.tournamentId,
        array[0],
        array[1],
        type
      );
      await this.updateTournament();
      this.uiState.showMessage({
        title: 'Отправленны данные',
        message: 'Информация о матче отправленна',
        type: 'success'
      });
    } catch (response) {
      console.warn(response);
      if (response && response.error) {
        this.uiState.showMessage({
          title: 'Ошибка добавления',
          message: response.error.message,
          type: 'error'
        });
      }
    }
  }

  async addMe(isEdit = false) {
    const data: IAddData = {
      DeckCount: this.tournament.DeckCount,
      isEdit: isEdit
    };
    const member = this.tournament.Members.find(m => m.UserID === this.profile.ID);
    if (isEdit && member) {
      data.DeckList = member.DeckList;
    }
    const dialogRef = this.dialog.open(AddMeDialogComponent, {
      data: data,
      height: '600px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          if (isEdit && member) {
            await this.tournamentService.editMember(
              this.tournament.ID,
              member.ID,
              result
            );
          } else {
            await this.tournamentService.addMember(
              this.tournament.ID,
              this.profile.ID,
              result
            );
          }
        } catch (response) {
          console.warn(response);
          if (response && response.error) {
            this.uiState.showMessage({
              title: 'Ошибка добавления',
              message: response.error.message,
              type: 'error'
            });
          }
        }
        this.load();
      }
    });
  }

  async banRequestList() {
    const dialogRef = this.dialog.open(BanRequestListDialogComponent, {
      data: {
        tournament: this.tournament,
        profile: this.profile
      },
      height: '600px',
      width: '1200px',
    });
  }
}

export interface IData {
  groups: IGroup[];
  playoff: any;
  playoffType: 'single' | 'double';
}

export interface IGroup {
  name: string;
  data: any;
}
