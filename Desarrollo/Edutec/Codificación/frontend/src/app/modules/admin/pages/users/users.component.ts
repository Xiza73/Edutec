import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['username', 'name', 'email','role','status','menu'];
  dataSource =new MatTableDataSource<UsersElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    }
  

  newUser(): void {
    this.dialog.open(CreateEditUserComponent, {
      width: '600px'
    });
  }

  
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
}

export interface UsersElement {
  username: string;
  role:string;
  status:string;
  name:string;
  email:string;
  menu:'';
}
 
const ELEMENT_DATA: UsersElement[] = [
  {username: 'maria509', role:'rol1 ',status:'activo',name: 'maria',email:'maria509@gmail.com',menu:''},
  {username: 'andre09', role:'rol3 ',status:'activo',name: 'Andrés',email:'andre09@gmail.com',menu:''},
  {username: 'milagros09', role:'rol2 ',status:'activo',name: 'milagros',email:'milagros09@gmail.com',menu:''},
  {username: 'garcia404', role:'rol ',status:'activo',name: 'homero',email:'garciah@gmail.com',menu:''},
  {username: 'maria989', role:'rol1 ',status:'activo',name: 'maria',email:'maria989@gmail.com',menu:''},
  {username: 'juan83', role:'rol3 ',status:'activo',name: 'juan',email:'juan83@gmail.com',menu:''},
  {username: 'jose709', role:'rol2 ',status:'activo',name: 'jose',email:'jose709@gmail.com',menu:''},
  {username: 'lobo33', role:'rol2 ',status:'activo',name: 'Abel',email:'abel33@gmail.com',menu:''},

];