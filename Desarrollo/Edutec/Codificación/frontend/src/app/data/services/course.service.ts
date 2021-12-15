import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl: string = environment.apiUrl;
  private courses: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  public readCourses(name: string, field = 'start', order = 1): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('field', field)
      .set('order', order);

    return this.httpClient.get(this.apiUrl + '/course', {params});
  }

  public setCourses(courses: any[]) {
    this.courses = courses;
  }

  public getCourses(): any[] {
    return this.courses;
  }
}
