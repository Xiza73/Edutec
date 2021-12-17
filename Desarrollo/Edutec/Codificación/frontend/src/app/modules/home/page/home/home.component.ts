import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faBook = faBook;
  public courses: any[] = [1, 2, 3, 4];

  // Form
  form: FormGroup = this.fb.group({
    name: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  findCourse(): void {
    const { name } = this.form.value;
    
    this.router.navigate(['cursos/busqueda'], {queryParams: {
      'course': name, 
      'option': 1
    }});
  }
}


