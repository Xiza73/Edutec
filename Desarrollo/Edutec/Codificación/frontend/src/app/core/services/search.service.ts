import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/data/services/course.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private courses: any[] = [];
  private searchTerm: string = '';

  constructor(
    private courseService: CourseService
  ) { }

  public searchCourses(name: string, field = 'start', order = 1): Observable<any> {
    this.searchTerm = name;
    return this.courseService.readCourses(name, field, order);
  }

  public setCourses(courses: any[]) {
    this.courses = courses;
  }

  public getCourses(): any[] {
    return this.courses;
  }

  public getSearchTerm(): string {
    return this.searchTerm;
  }
}
