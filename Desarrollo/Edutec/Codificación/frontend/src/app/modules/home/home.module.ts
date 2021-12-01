import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseBoxComponent } from './page/course-box/course-box.component';


@NgModule({
  declarations: [
    HomeComponent,
    CourseBoxComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
