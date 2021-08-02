import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent {
  @Input() id:string = ''; 
  @Input() titulo:string = '';
  @Input() fecha:string = ''; 
  @Input() hora:string = ''; 
  @Input() sala:string = ''; 
  @Input() foto:string = ''; 
  
  constructor(private router:Router) {}

}
