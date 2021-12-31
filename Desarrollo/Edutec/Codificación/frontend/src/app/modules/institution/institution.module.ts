import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionDetailComponent } from './page/institution-detail/institution-detail.component';
import { InstitutionSearchComponent } from './page/institution-search/institution-search.component';


@NgModule({
  declarations: [
    InstitutionDetailComponent,
    InstitutionSearchComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule
  ]
})
export class InstitutionModule { }
