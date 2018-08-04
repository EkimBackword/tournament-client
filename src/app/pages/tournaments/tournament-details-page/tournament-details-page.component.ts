import { Component, OnInit } from '@angular/core';
import { TournamentService, ITournament } from '../../../services/tournament.service';
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
  async load() {
    this.profile = await this.userService.GetProfile();
    this.tournament = await this.tournamentService.getTournament(this.tournamentId, true);
    this.data = JSON.parse(this.tournament.JsonData);
    if ( this.data.groups === void 0 ) {
      this.data = {
        groups: [
          { name: 'A', data: this.doubleData },
          { name: 'B', data: this.doubleData },
        ],
        playoff: this.singleData
      };
      await this.tournamentService.upadeteTournament(
        this.tournamentId,
        this.tournament.Title,
        JSON.stringify(this.data)
      );
    }
  }
  async addGroup() {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z' ];
    if (this.data.groups.length === symbols.length) { return; }
    this.data.groups.push({ name: symbols[this.data.groups.length], data: this.doubleData });
    await this.tournamentService.upadeteTournament(
      this.tournamentId,
      this.tournament.Title,
      JSON.stringify(this.data)
    );
  }

  async remove() {
    this.data.groups.pop();
    await this.tournamentService.upadeteTournament(
      this.tournamentId,
      this.tournament.Title,
      JSON.stringify(this.data)
    );
  }

  async SaveOnChange(data: any, item: any, type: 'playoff' | 'group') {
    if (type === 'group') {
      const group = this.data.groups.find(g => g.name === item.name && g.data === item.data);
      group.data = data;
    } else {
      this.data.playoff = data;
    }
    item = data;
    await this.tournamentService.upadeteTournament(
      this.tournamentId,
      this.tournament.Title,
      JSON.stringify(this.data)
    );
    console.log(this.data);
  }
}

export interface IData {
  groups: IGroup[];
  playoff: any;
}

export interface IGroup {
  name: string;
  data: any;
}
