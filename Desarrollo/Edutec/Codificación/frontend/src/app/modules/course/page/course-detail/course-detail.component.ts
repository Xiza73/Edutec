import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Icons
  public faHeart = faHeart;
  public active = false;

  constructor() { }

  ngOnInit(): void {
  }

  public addDeleteFavorite() {
    this.active = !this.active
  }

}
