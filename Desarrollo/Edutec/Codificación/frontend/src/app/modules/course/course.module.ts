import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './page/course-detail/course-detail.component';
import { CourseSearchComponent } from './page/course-search/course-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseSearchFormComponent } from './components/course-search-form/course-search-form.component';
import { CourseSearchContentComponent } from './components/course-search-content/course-search-content.component';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseSearchComponent,
    CourseSearchFormComponent,
    CourseSearchContentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FontAwesomeModule
  ]
})
export class CourseModule { }
