import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './page/course-detail/course-detail.component';
import { CourseSearchComponent } from './page/course-search/course-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseSearchComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FontAwesomeModule
  ]
})
export class CourseModule { }
