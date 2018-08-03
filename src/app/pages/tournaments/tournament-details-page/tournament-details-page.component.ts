import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-details-page',
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.less']
})
export class TournamentDetailsPageComponent implements OnInit {

  data: any;
  canEdit = false;

  singleData = {
    teams: [ [null, null], [null, null] ],
    results: [[ [], [] ]]
  };

  doubleData = {
    teams: [ [null, null], [null, null] ],
    results: [[[[]]], [], []]
  };

  constructor() { }

  ngOnInit() {
    this.data = {
      groups: [
        { name: 'A', data: this.doubleData },
        { name: 'B', data: this.doubleData },
      ],
      playoff: this.singleData
    };
  }

  SaveOnChange(data, item) {
    console.log(data, item);
  }
}
