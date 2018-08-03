import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITournament } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public async LogIn(Login, Password) {
    try {
        return await this.http.post<IUser>(`${environment.backendUrl}/user/login`, { Login, Password }).toPromise();
    } catch (e) {
        throw e;
    }
  }

  public async LogOut() {
    try {
        return await this.http.get(`${environment.backendUrl}/user/logout`).toPromise();
    } catch (e) {
        throw e;
    }
  }

  public async GetProfile(option?: { withTournaments?: boolean }) {
      try {
          const url = `${environment.backendUrl}/user/profile`;
          const params = Object.keys(option).reduce((_params, key) => {
            _params[key] = option[key].toString();
            return _params;
          }, {});
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

  Tournaments?: ITournament[];
}

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}
