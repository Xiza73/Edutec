import { Component, OnInit } from '@angular/core';
import { faBook, faChevronLeft, faChevronRight, faHistory, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/core/services/search.service';
import { CourseService } from 'src/app/data/services/course.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  faBook = faBook;
  faSearch = faSearch;
  faSort = faSort;
  faHistory = faHistory;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  courses: any[] = [];
  total: number = 0;
  searchTerm: string = '';

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.courses = this.searchService.getCourses();
    this.total = this.courses.length;
    this.searchTerm = this.searchService.getSearchTerm();
  }

}
