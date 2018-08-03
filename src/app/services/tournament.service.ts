import { Injectable } from '@angular/core';
import { IUser } from './user.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  public async getList() {
    try {
        return await this.http.get<IGetListResult>(`${environment.backendUrl}/tournament/list`).toPromise();
    } catch (e) {
        throw e;
    }
  }

  public async createTournament(Title: string, JsonData: string) {
    try {
        return await this.http.post<ITournament>(`${environment.backendUrl}/tournament/add`, { Title, JsonData }).toPromise();
    } catch (e) {
        throw e;
    }
  }
}

export interface ITournament {
  ID?: number;
  Title: string;
  JsonData: string;
  UserID?: number;

  User?: IUser;
}

export interface IGetListResult {
  result: ITournament[];
  count: number;
}
