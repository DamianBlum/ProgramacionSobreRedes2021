import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'config/config.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss'],
  providers: [ConfigService],
})
export class CarteleraComponent implements OnInit {
  constructor(private conf: ConfigService) {}

  public peliculas: Array<Map<String, String>> = [];
  public cartelera: Array<any> = [];

  ngOnInit(): void {
    this.conf.getCartelera().subscribe((data) => {
      this.cartelera = data;
      this.peliculas = new Array();

      this.cartelera.forEach((peliculaDatos) => {
        let pelicula: Map<String, String> = new Map();
        pelicula.set('id', peliculaDatos['id']);
        pelicula.set('titulo', peliculaDatos['titulo']);
        pelicula.set('fecha', peliculaDatos['fecha'].split('T')[0]);
        pelicula.set('hora',peliculaDatos['fecha'].split('T')[1].split('.')[0]);
        pelicula.set('sala', peliculaDatos['sala']);
        pelicula.set('foto', peliculaDatos['foto']);
        this.peliculas.push(pelicula);
      });
    });
  }
}