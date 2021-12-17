import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './page/course-detail/course-detail.component';
import { CourseSearchComponent } from './page/course-search/course-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'busqueda',
        component: CourseSearchComponent
      },
      {
        path: 'detalle/:id',
        component: CourseDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
