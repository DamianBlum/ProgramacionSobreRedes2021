import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  

  constructor(private peliculas: Map<String, Map<String, String>>) {

   }

  ngOnInit(): void {
    //aca consigo la data de la base
    let pelicula: Map<String, String> = new Map();
    pelicula.set("titulo", "El secreto de sus ojos");
    pelicula.set("duracion","130");
    this.peliculas.set("hola",pelicula);

  }


}
