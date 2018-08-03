import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TournamentsModule } from './tournaments/tournaments.module';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/tournaments',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TournamentsModule,
    RouterModule.forRoot( appRoutes ),
  ],
  declarations: [
    LoginPageComponent,
    NotFoundPageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
