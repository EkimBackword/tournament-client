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
        return await this.http.post<number>(`${environment.backendUrl}/tournament/add`, { Title, JsonData }).toPromise();
    } catch (e) {
        throw e;
    }
  }
  public async upadeteTournament(ID: number, Title: string, JsonData: string, Status?: TournamentStatusENUM) {
    try {
        return await this.http.post<void>(`${environment.backendUrl}/tournament/${ID}/edit`, { Title, JsonData, Status }).toPromise();
    } catch (e) {
        throw e;
    }
  }
  public async deleteTournament(ID: number) {
    try {
        return await this.http.delete(`${environment.backendUrl}/tournament/${ID}`).toPromise();
    } catch (e) {
        throw e;
    }
  }
  public async getTournament(ID: number, withUser?: boolean) {
    try {
      const params = withUser ? { withUser: '1', withMembers: '1' } : {};
        return await this.http.get<ITournament>(`${environment.backendUrl}/tournament/${ID}`, { params }).toPromise();
    } catch (e) {
        throw e;
    }
  }
  public async sendOpponentInfo(ID: number, gamerID: any, opponentID: any) {
    try {
      return await this.http.post<IBanRequest>(`${environment.backendUrl}/tournament/${ID}/send-opponent-info`, {
          gamerID,
          opponentID
      }).toPromise();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  public async addMember(ID: number, userId: any, Decks: string[]) {
    try {
      return await this.http.post<IBanRequest>(`${environment.backendUrl}/tournament/${ID}/add-member`, {
        userId,
        Decks
      }).toPromise();
    } catch (e) {
      throw e;
    }
  }
  public async getBanRequestList(ID: number, userId: any) {
    try {
      return await this.http.post<IBanRequest[]>(`${environment.backendUrl}/tournament/${ID}/get-ban-request-list`, {
        userId
      }).toPromise();
    } catch (e) {
      throw e;
    }
  }
  public async saveBanRequest(ID: number, data: IBanRequest) {
    try {
      return await this.http.post<void>(`${environment.backendUrl}/tournament/${ID}/save-ban-request`, data).toPromise();
    } catch (e) {
      throw e;
    }
  }
}

export interface ITournament {
  ID?: number;
  Title: string;
  JsonData: string;
  Status: TournamentStatusENUM;
  DeckCount: number;
  UserID?: number;
  CreationDate?: Date;
  UpdatedAt?: Date;

  User?: IUser;
  Members?: IMembers[];
}

export interface IBanRequest {
  ID?: number;
  TournamentID: number;

  GamerBattleTag: string;
  GamerDeckList: string;
  GamerBannedDeck?: string;
  GamerResultInfo?: string;
  GamerChatID?: number;

  OpponentBattleTag: string;
  OpponentDeckList: string;
  OpponentBannedDeck?: string;
  OpponentResultInfo?: string;
  OpponentChatID?: number;

  Tournament?: ITournament;

  isShowen?: boolean;
}

export enum TournamentStatusENUM {
  'new',
  'start',
  'finished'
}

export const TournamentStatusDescription = {};
TournamentStatusDescription[TournamentStatusENUM.new] = 'Новый турнир, идет регистрация';
TournamentStatusDescription[TournamentStatusENUM.start] = 'Турнир стартовал, можете следить за результатами';
TournamentStatusDescription[TournamentStatusENUM.finished] = 'Турнир окончен';

export interface IGetListResult {
  result: ITournament[];
  count: number;
}

export interface IMembers {
  ID?: number;
  TournamentID: number;
  UserID: number;
  DeckList: string;
  User: IUser;
}
