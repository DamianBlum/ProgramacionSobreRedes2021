import { Component, OnInit } from '@angular/core'; 
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

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
    pelicula.set("fecha",'2020-04-13');
    pelicula.set("hora",'22:30:00');
    
    let pelicula2: Map<String,String> = new Map();
    pelicula2.set("titulo", "Sexo sentido");
    pelicula2.set("fecha",'2020-04-13');
    pelicula2.set("hora",'22:30:00');
    
    this.peliculas.push(pelicula);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
    this.peliculas.push(pelicula2);
  } 
  
}

window.onload = function() {
  for (let i=0; i < document.getElementsByClassName("carousel-item").length; i++){
    document.getElementsByClassName("carousel-indicators")[0].innerHTML += 
    `<button
    type="button"
    data-bs-target="#carouselExampleDark"
    data-bs-slide-to="${i}"
    aria-current="true"
    aria-label="Slide ${i+1}"
    class= "indicador"
    ></button>`;
  } 
  
  document.getElementsByClassName("carousel-item")[0].className += " active";
  document.getElementsByClassName("indicador")[0].className += " active";
}