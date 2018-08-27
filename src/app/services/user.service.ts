import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITournament } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  constructor(private http: HttpClient) {}

  public async LogIn(Login, Password) {
    try {
      if (this.user === void 0 || this.user === null) {
        this.user = await this.http.post<IUser>(`${environment.backendUrl}/user/login`, { Login, Password }).toPromise();
      }
      return this.user;
    } catch (e) {
        throw e;
    }
  }

  public async LogOut() {
    try {
      await this.http.get(`${environment.backendUrl}/user/logout`).toPromise();
      this.user = null;
    } catch (e) {
        throw e;
    }
  }

  public async SignUp(data: any) {
    try {
      await this.http.post(`${environment.backendUrl}/user/add`, data).toPromise();
    } catch (e) {
      throw e;
    }
  }

  public async GetProfile(option?: { withTournaments?: boolean }) {
      try {
          const url = `${environment.backendUrl}/user/profile`;
          let params = {};
          if (option) {
            params = Object.keys(option).reduce((_params, key) => {
              _params[key] = option[key].toString();
              return _params;
            }, {});
          }
          return await this.http.get<IUser>(url, { params }).toPromise();
      } catch (e) {
          return null;
      }
  }
}

export interface IUser {
  ID?: number;
  Login: string;
  FIO: string;
  Role: UserRoles;
  Hash: string;
  BattleTag?: string;

  Tournaments?: ITournament[];
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}
