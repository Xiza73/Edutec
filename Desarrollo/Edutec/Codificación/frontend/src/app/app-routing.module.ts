import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from './core/guards/user-logged-in.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'usuario',
        canActivate: [ UserLoggedInGuard ],
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'instituciones',
        loadChildren: () => import('./modules/institution/institution.module').then(m => m.InstitutionModule)
      }
    ]
  },
  {
    path: '',
    canActivate: [ UserLoggedInGuard ],
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
