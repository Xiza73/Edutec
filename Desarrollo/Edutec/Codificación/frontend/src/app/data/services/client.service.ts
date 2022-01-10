import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public readClient(clientId: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/client/${clientId}`);
  }

  public addFavorite(clientId: string, courseUrl: string): Observable<any> {
    const payload = { clientId, courseUrl };
    return this.httpClient.post(this.apiUrl + '/client/favorites/add', payload);
  }

  public removeFavorite(clientId: string, courseUrl: string): Observable<any> {
    const payload = { clientId, courseUrl };
    return this.httpClient.post(this.apiUrl + '/client/favorites/remove', payload);
  }

  public readFavorites(clientId: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/client/favorites/${clientId}`);
  }

  public getUserProfile(id: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (id) {
      params = params.append('id', id);
    }
    return this.httpClient.get<any>(this.apiUrl + '/client/profile/id', { observe: "response", params });
  }

  public updateUserProfile(body: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/client/profile', body, { observe: "body" });
  }
}
