import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TournamentsListPageComponent } from './tournaments-list-page/tournaments-list-page.component';
import { TournamentDetailsPageComponent } from './tournament-details-page/tournament-details-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TournamentsPageComponent } from './tournaments-page/tournaments-page.component';
import { TournamentHelpComponent } from './tournament-help/tournament-help.component';

const tournamentsRoutes: Routes = [
  { path: 'tournaments', component: TournamentsPageComponent,
    children: [
      { path: '', component: TournamentsListPageComponent },
      { path: 'help', component: TournamentHelpComponent },
      { path: ':tournamentId', component: TournamentDetailsPageComponent },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(tournamentsRoutes),
    SharedModule
  ],
  declarations: [
    TournamentsPageComponent,
    TournamentsListPageComponent,
    TournamentDetailsPageComponent,
    TournamentHelpComponent,
  ],
  exports: [
    RouterModule
  ]
})
export class TournamentsModule { }
