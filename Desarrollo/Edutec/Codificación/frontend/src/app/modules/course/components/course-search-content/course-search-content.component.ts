import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-search-content',
  templateUrl: './course-search-content.component.html',
  styleUrls: ['./course-search-content.component.scss']
})
export class CourseSearchContentComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
