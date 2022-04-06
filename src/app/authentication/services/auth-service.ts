import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response';
import { AuthCredentials } from '../models/auth-credentials';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private idTokenKey: string = 'id_token';
  private expiresAtKey: string = 'expires_at';

  constructor(public storageService: Storage, private httpClient: HttpClient) {}

  login(credentials: AuthCredentials): Observable<boolean> {
    return this.httpClient
      .post<AuthResponse>('http://localhost:3000/login', credentials)
      .pipe(
        map((authResponse) => {
          if (authResponse.jwt == null) {
            return false;
          } else {
            this.setSession(authResponse);
            return true;
          }
        })
      );
  }

  logout() {
    this.storageService.removeItem(this.idTokenKey);
    this.storageService.removeItem(this.expiresAtKey);
  }

  loggedIn(): boolean {
    let now = moment();
    return now.isBefore(this.getExpiration());
  }

  getAuthToken(): string | null {
    return this.storageService.getItem(this.idTokenKey);
  }

  private setSession(authResponse: AuthResponse): void {
    const expiresAt = moment().add(authResponse.expiresIn, 'minutes');
    this.storageService.setItem(this.idTokenKey, authResponse.jwt);
    this.storageService.setItem(
      this.expiresAtKey,
      JSON.stringify(expiresAt.valueOf())
    );
  }

  private getExpiration(): object | null {
    const expiration = this.storageService.getItem(this.expiresAtKey);
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return null;
    }
  }
}
