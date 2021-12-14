import { Component, OnInit } from '@angular/core';
import { faAngleRight, faBook, faChevronLeft, faChevronRight, faHistory, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
