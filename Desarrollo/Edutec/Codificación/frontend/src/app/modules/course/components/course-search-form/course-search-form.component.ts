import { Component, OnInit } from '@angular/core';
import { faBook, faHistory, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-search-form',
  templateUrl: './course-search-form.component.html',
  styleUrls: ['./course-search-form.component.scss']
})
export class CourseSearchFormComponent implements OnInit {
  faBook = faBook;
  faSearch = faSearch;
  faSort = faSort;
  faHistory = faHistory;

  constructor() { }

  ngOnInit(): void {
  }

}
