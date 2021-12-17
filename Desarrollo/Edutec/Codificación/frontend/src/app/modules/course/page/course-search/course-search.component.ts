import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBook, faChevronLeft, faChevronRight, faHistory, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/core/services/search.service';

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

  form: FormGroup = this.fb.group({
    searchTerm: [],
    option    : []
  });

  courses: any[] = [];
  total: number = 0;
  searchTerm: string = '';
  sort: string = '';
  field: string = 'start';

  // Pagination
  coursesToShow: any[] = [];
  pageSize: number = 2;
  currentPage: number = 1;
  numberPages: number = 0;

  // Search history
  courseSearchHistory: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const searchTerm = this.route.snapshot.queryParams.course || '';
    const option = this.route.snapshot.queryParams.option || 1;

    this.form.setValue({
      searchTerm,
      option: (option > 3) ? 1 : option
    });

    this.searchCourses();
  }

  search(): void {
    this.router.navigate(['/cursos/busqueda'], {queryParams: {
      'course': this.form.value.searchTerm, 
      'option': this.form.value.option
    }});

    this.searchCourses();
  }

  nextPage(): void {
    const index = this.currentPage * this.pageSize;
    this.currentPage += 1;
    this.coursesToShow = this.courses.slice(index, index + this.pageSize);
  }

  previousPage(): void {
    const index = (this.currentPage - 1) * this.pageSize;
    this.currentPage -= 1;
    this.coursesToShow = this.courses.slice(index - this.pageSize, index);
  }

  showNextPageBtn(): boolean {
    return this.currentPage !== this.numberPages;
  }

  showPreviousPageBtn(): boolean {
    return this.currentPage !== 1;
  }

  execSearchHistoryItem(name: string): void {
    this.form.setValue({
      searchTerm: name,
      option: 1
    });

    this.router.navigate(['/cursos/busqueda'], {queryParams: {
      'course': this.form.value.searchTerm, 
      'option': this.form.value.option
    }});

    this.searchCourses();
  }

  private setOrderOptions(value: string): void {
    switch (value) {
      case '1':
        this.field = 'start';
        this.sort = 'asc';
        break;
      case '2':
        this.field = 'price';
        this.sort = 'asc';
        break;
      case '3':
        this.field = 'price';
        this.sort = 'desc';
        break;
      default: 
        this.field = 'start';
        this.sort = 'asc';
        break;
    }
  }

  private searchCourses(): void {
    this.setOrderOptions(this.form.value.option);

    this.searchService.searchCourses(this.form.value.searchTerm, this.field, this.sort).subscribe(
      response => {
        this.courses = response.data;
        this.total = this.courses.length;
        this.searchTerm = this.form.value.searchTerm;
        
        this.numberPages = Math.ceil(this.total / this.pageSize);
        this.coursesToShow = this.courses.slice(0, this.pageSize);

        this.getCourseSearchHistory();
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  private getCourseSearchHistory(): void {
    const history = localStorage.getItem('courseSearchHistory');
    this.courseSearchHistory = JSON.parse(history!);
  }

}
