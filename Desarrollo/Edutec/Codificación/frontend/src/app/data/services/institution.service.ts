import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  public readInstitutions(name: string, field: string, sort: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('field', field)
      .set('sort', sort);

    return this.httpClient.get(this.apiUrl + '/institution', {params});
  }
  public readInsitution(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/institution/${id}`);
  }
}
