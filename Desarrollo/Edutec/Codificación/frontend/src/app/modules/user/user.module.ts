import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    SharedModule,
    NgxSpinnerModule
=======
    SharedModule
>>>>>>> 71e6abc8c301983af1cf9be75a5128ea1075efee
  ]
})
export class UserModule { }
