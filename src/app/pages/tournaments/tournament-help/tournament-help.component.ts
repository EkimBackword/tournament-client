import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-help',
  templateUrl: './tournament-help.component.html',
  styleUrls: ['./tournament-help.component.less']
})
export class TournamentHelpComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  goToTournamentsList() {
    this.router.navigate(['/tournaments']);
  }

}
