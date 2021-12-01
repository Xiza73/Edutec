import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faBook = faBook;
  public courses: any[] = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
  }

}
