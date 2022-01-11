import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import{ MatInputModule} from  '@angular/material/input'
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    InstitutionsComponent,
    CreateEditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSortModule
  ]
})
export class AdminModule { }
