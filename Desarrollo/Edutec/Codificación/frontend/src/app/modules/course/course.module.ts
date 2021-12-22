import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseDetailComponent } from './page/course-detail/course-detail.component';
import { CourseSearchComponent } from './page/course-search/course-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseSearchItemComponent } from './components/course-search-item/course-search-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseSearchComponent,
    CourseSearchItemComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
