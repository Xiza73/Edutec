import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarizePipe } from './pipes/summarize.pipe';
import { CourseBoxComponent } from './components/course-box/course-box.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SummarizePipe,
    CourseBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SummarizePipe,
    CourseBoxComponent
  ]
})
export class SharedModule { }
