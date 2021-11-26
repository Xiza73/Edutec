import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/data/types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/signin', user);
  }

  public singup(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/signup', user);
  }

}
