import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/data/services/course.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private courseSearchHistory: string[] = [];

  constructor(
    private courseService: CourseService
  ) { }

  public searchCourses(name = '', field = 'start', sort = 'asc'): Observable<any> {
    if (sort === 'desc') {
      return this.courseService.readCourses(name, field, '-1');
    }
    return this.courseService.readCourses(name, field, '1');
  }

  public saveSearch(term: string): void {
    const name = term.toLowerCase();

    if (name === '' || this.courseSearchHistory.includes(name)) {
      return;
    }

    if (this.courseSearchHistory.length === 5) {
      this.courseSearchHistory.shift();
    }

    this.courseSearchHistory.push(name);
    localStorage.setItem( 'courseSearchHistory', JSON.stringify(this.courseSearchHistory) );
  }

  public getCourseSearchHistory(): any[] {
    return this.courseSearchHistory;
  }
}
