import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public courses: any[] = [
    {name:"React course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:123,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"C# course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:150,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"JS course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:120,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"Angular course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:123,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"React course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:123,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"C# course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:150,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"JS course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:120,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"},
    {name:"Angular course",image:"https://www.academiamoviles.com/viewsAM/fotosCursos/-ios_enero_ii.png",description:"Nivel inicial intermedio",price:123,currency:"PEN",schedule:"Martes y Jueves 3pm a 6pm"}

  ];
  constructor() { }

  ngOnInit(): void {
    
  }

}
