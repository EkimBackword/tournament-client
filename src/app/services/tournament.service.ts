import { Injectable } from '@angular/core';
import { IUser } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor() { }
}

export interface ITournament {
  ID?: number;
  Title: string;
  JsonData: string;
  UserID?: number;

  User?: IUser;
}
