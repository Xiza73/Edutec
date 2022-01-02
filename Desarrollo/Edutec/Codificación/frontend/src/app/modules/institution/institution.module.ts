import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionDetailComponent } from './page/institution-detail/institution-detail.component';
import { InstitutionSearchComponent } from './page/institution-search/institution-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    InstitutionDetailComponent,
    InstitutionSearchComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class InstitutionModule { }
