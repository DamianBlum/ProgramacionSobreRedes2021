import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent {
@Input() titulo:string = '';
@Input() duracion:string = '';    

  clickPelicula(): void{

  }
}
