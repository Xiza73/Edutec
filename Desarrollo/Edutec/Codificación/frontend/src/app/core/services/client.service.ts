import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getUserProfile(username: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (username) {
      params = params.append('username', username);
    }
    return this.httpClient.get<any>(this.apiUrl + '/client', { observe: "response", params });
  }

  public updateUserProfile(body: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/client', body, { observe: "body" });
  }
}
