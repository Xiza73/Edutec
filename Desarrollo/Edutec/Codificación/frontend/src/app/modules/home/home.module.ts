import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseBoxComponent } from './components/course-box/course-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    CourseBoxComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class HomeModule { }
