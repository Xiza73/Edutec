import { Injectable } from '@angular/core';

const TOKEN = 'ACCESS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);

    return !this._tokenExpired(values.exp);
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
 
}
