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

    if (!this.list.every(r => r.isShowen)) {
      this.preLoad(0);
    }
  }

  async preLoad(count) {
    if (count > 20) {
      return;
    }
    setTimeout(async () => {
      const list = (await this.tournamentService.getBanRequestList(
        this.data.tournament.ID,
        this.data.profile.ID
      )).map(r => {
        r.isShowen = r.GamerBannedDeck !== null && r.OpponentBannedDeck !== null;
        return r;
      });
      console.log(list);

      if (!this.list.every(r => r.isShowen)) {
        this.preLoad(count++);
      } else {
        this.load();
      }
    }, 5000);
  }

  ban(deck, item: IBanRequest, type: 'gamer' | 'opponent') {
    if (type === 'gamer' && item.OpponentBattleTag === this.data.profile.BattleTag && !item.isShowen) {
      item.GamerBannedDeck = deck;
    } else if (item.GamerBattleTag === this.data.profile.BattleTag && !item.isShowen) {
      item.OpponentBannedDeck = deck;
    }
  }

  async save(item: IBanRequest) {
    await this.tournamentService.saveBanRequest(
      this.data.tournament.ID,
      item
    );
    this.load();
  }

}
