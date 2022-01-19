import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUserProfile(id: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (id) {
      params = params.append('id', id);
    }
    return this.httpClient.get<any>(this.apiUrl + '/admin/profile/id', { observe: "response", params });
  }

}
