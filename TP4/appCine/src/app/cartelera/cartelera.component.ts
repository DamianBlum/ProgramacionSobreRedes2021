import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  public peliculas: Array<Map<String, String>> = [];
  
  constructor() {

   }

  ngOnInit(): void {
    //aca consigo la data de la base
    this.peliculas= new Array();
    let pelicula: Map<String, String> = new Map();
    pelicula.set("titulo", "El secreto de sus ojos");
    pelicula.set("duracion","130");
    this.peliculas.push(pelicula);
    let pelicula2: Map<String,String> = new Map();
    pelicula2.set("titulo", "Sexo sentido");
    pelicula2.set("duracion","70");
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
  }
}
document.getElementsByClassName("carousel-item")[0].className += " active"