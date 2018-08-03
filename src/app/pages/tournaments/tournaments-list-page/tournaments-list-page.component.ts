import { Component, OnInit } from '@angular/core';
import { ITournament, TournamentService, IGetListResult } from '../../../services/tournament.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IUser, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-tournaments-list-page',
  templateUrl: './tournaments-list-page.component.html',
  styleUrls: ['./tournaments-list-page.component.less']
})
export class TournamentsListPageComponent implements OnInit {

  tournamentsInfo: IGetListResult;
  page: number;
  limit: number;

  profile: IUser = null;

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.page = Number(params.get('page')) || 1;
      this.limit = Number(params.get('limit')) || 25;
      this.load();
    });
  }

  async load() {
    this.profile = await this.userService.GetProfile();
    console.log(this.profile);
    this.tournamentsInfo = await this.tournamentService.getList();
  }

  async addTournament() {
    try {
      const tournamentId = await this.tournamentService.createTournament('title', JSON.stringify({}));
      this.router.navigate([`/tournaments/${tournamentId}`]);
    } catch (err) {
      console.log(err);
    }
  }

  nextPage() {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['page'] = +queryParams['page'] + 1;
    this.router.navigate(['.'], { queryParams: queryParams });
  }

  prevPage() {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['page'] = +queryParams['page'] - 1;
    this.router.navigate(['.'], { queryParams: queryParams });
  }

}
