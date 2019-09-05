import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseService } from '../shared/base.service';
import { ConfigService } from '../shared/config.service';

@Injectable()
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private config: ConfigService) {
    super();
  }

  public isAuthenticated(): boolean {
    let currentUser = JSON.parse(localStorage.getItem(this.config.currentUser));
    if (currentUser == null || this.jwtHelper.isTokenExpired(currentUser.accessToken))
      return false;
    return true;
  }
  user(): User {
    return JSON.parse(localStorage.getItem(this.config.currentUser));
  }
  login(userName: string, password: string): Observable<User> {
    return this.http.post<User>(this.config.authenticateUrl, { userName: userName, password: password })
      .pipe(map((user: User) => {
        if (user && user.accessToken) {
          localStorage.setItem(this.config.currentUser, JSON.stringify(user));
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem(this.config.currentUser);
  }
  refreshToken(): Observable<User> {

    let currentUser = JSON.parse(localStorage.getItem(this.config.currentUser));

    return this.http.post<User>(this.config.refreshTokenUrl, { 'token': currentUser.accessToken, 'refreshToken': currentUser.refreshToken })
      .pipe(
        map(user => {
          return user;
        }));
  }

  getAuthToken(): string {
    let currentUser = JSON.parse(localStorage.getItem(this.config.currentUser));

    if (currentUser != null) {
      return currentUser.accessToken;
    }
  }
}