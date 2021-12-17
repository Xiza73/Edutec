import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/data/services/course.service';
import { switchMap, tap } from 'rxjs/operators';
import { InstitutionService } from 'src/app/data/services/institution.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  // Icons
  faHeart = faHeart;
  active = false;

  courseId: string = '';
  course: any = {};
  institution: any = {};

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private institutionService: InstitutionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.courseService.readCourse(this.courseId)
      .pipe(
        tap(response => this.course = response.data),
        switchMap(response => this.institutionService.readInsitution(this.course.institution))
      )
      .subscribe(
        response => {
          console.log(response.data);
          this.institution = response.data;
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      )
  }

  public addDeleteFavorite() {
    this.active = !this.active
  }

}
