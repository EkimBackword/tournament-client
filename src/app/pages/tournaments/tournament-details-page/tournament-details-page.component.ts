import { Component, OnInit } from '@angular/core';
import { TournamentService, ITournament, TournamentStatusDescription, TournamentStatusENUM } from '../../../services/tournament.service';
import { UserService, IUser } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
    await this.tournamentService.upadeteTournament(this.tournamentId, this.tournament.Title, JSON.stringify(this.data));
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
    this.tournament.Status = this.tournament.Status === TournamentStatusENUM.new ?
    TournamentStatusENUM.start : TournamentStatusENUM.finished;
    await this.tournamentService.upadeteTournament(
      this.tournamentId,
      this.tournament.Title,
      JSON.stringify(this.data),
      this.tournament.Status
    );
  }
  async sendOpponentInfo(array: any[]) {
    await this.tournamentService.sendOpponentInfo(
      this.tournamentId,
      array[0],
      array[1]
    );
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
