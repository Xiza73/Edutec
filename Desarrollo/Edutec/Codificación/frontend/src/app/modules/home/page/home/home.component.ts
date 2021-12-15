import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/core/services/search.service';

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
    private searchService: SearchService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  findCourse(): void {
    const { name } = this.form.value;
    this.searchService.searchCourses(name).subscribe(
      response => {
        this.searchService.setCourses(response.data);
        this.router.navigate(['cursos/busqueda']);
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
        this.form.reset();
      }
    );
  }

}
