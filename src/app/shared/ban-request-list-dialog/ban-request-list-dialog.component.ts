import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TournamentService, ITournament, IBanRequest } from '../../services/tournament.service';
import { IUser } from '../../services/user.service';

@Component({
  selector: 'app-ban-request-list-dialog',
  templateUrl: './ban-request-list-dialog.component.html',
  styleUrls: ['./ban-request-list-dialog.component.less']
})
export class BanRequestListDialogComponent implements OnInit {

  list: IBanRequest[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      tournament: ITournament,
      profile: IUser
    },
    public dialogRef: MatDialogRef<BanRequestListDialogComponent>,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.list = (await this.tournamentService.getBanRequestList(
      this.data.tournament.ID,
      this.data.profile.ID
    )).map(r => {
      r.isShowen = r.GamerBannedDeck !== null && r.OpponentBannedDeck !== null;
      return r;
    });
  }

  ban(deck, item: IBanRequest, type: 'gamer' | 'opponent') {
    if (type === 'gamer' && item.OpponentBattleTag === this.data.profile.BattleTag) {
      item.GamerBannedDeck = deck;
    } else if (item.GamerBattleTag === this.data.profile.BattleTag) {
      item.OpponentBannedDeck = deck;
    }
  }

  async save(item: IBanRequest) {
    console.log(item);
    // this.load();
  }

}
