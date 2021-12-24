import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/data/services/course.service';
import { switchMap, tap } from 'rxjs/operators';
import { InstitutionService } from 'src/app/data/services/institution.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/data/services/client.service';
import { Client } from 'src/app/data/types/client';
import { TokenService } from 'src/app/core/services/token.service';


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
  user: Client = {};

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private institutionService: InstitutionService,
    private clientService: ClientService,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.courseService.readCourse(this.courseId)
      .pipe(
        tap(response => this.course = response.data),
        switchMap(response => this.institutionService.readInsitution(response.data.institution))
      )
      .subscribe(
        response => {
          this.institution = response.data;
        },
        err => {
          this.toastr.error(err.error.message, 'Error');
        }
      );

    // Get user
    const userId = this.tokenService.getClientIdFromToken();
    if (userId) {
      this.clientService.readClient(userId).subscribe(
        response => {
          this.user = response.data;
          this.user.favorites?.forEach(id => {
            if (id === this.courseId) {
              this.active = true;
            }
          });
        }
      );
    }
  }

  public addDeleteFavorite(): void {
    if (!this.tokenService.isLogged()) {
      this.toastr.info('Inicia sesión para agregar a favoritos', 'Favoritos');
      return;
    }

    this.active = !this.active

    if (this.active) {
      this.clientService.addFavorite(this.user._id!, this.courseId).subscribe(
        response => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso agregado a favoritos', 'Favoritos');
          }
        }
      );
    } else {
      this.clientService.removeFavorite(this.user._id!, this.courseId).subscribe(
        response => {
          if (response.statusCode === 200) {
            this.toastr.success('Curso eliminado de favoritos', 'Favoritos');
          }
        }
      );
    }
  }

}
