import { Component, OnInit } from '@angular/core';
import { ConfigService, funcion } from 'config/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-pagina-reserva',
  templateUrl: './pagina-reserva.component.html',
  styleUrls: ['./pagina-reserva.component.scss'],
  providers: [ConfigService]
})

export class PaginaReservaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private conf:ConfigService,) { }

  public mapita : Map<String, any> = new Map();
  public pelicula : funcion | undefined; 

  StringAMapButacas(butacas:String): void{
    butacas = butacas
    .replace(/"/g, "")
    .replace("]", "")
    .replace("[", "")
    .replace(/ /g, "");

//idea aca poner lo de estados donde ahora hay un array, osea convertir el array en 

    console.log(butacas.split(","));

    butacas.split(",").forEach(element => {
      console.log(element);
      if (this.mapita.has(element[0])){
        this.mapita.get(element[0]).push(Number(element[1]));
      } else {
        this.mapita.set(element[0],[Number(element[1])]);
      }
    });


  }

  ngOnInit(): void {
    //let butacas:string = "[\"a1\", \"a2\", \"a3\", \"a4\", \"a5\", \"a6\", \"b1\", \"b2\", \"b3\", \"b4\", \"b5\", \"b6\", \"c1\", \"c2\", \"c3\", \"c4\", \"d1\", \"d2\", \"d3\", \"e1\", \"e2\", \"f1\"]"

    this.conf.getCartelera().subscribe((dataPeli)=>{
      dataPeli.forEach(peli => {
        if(peli.id == this.route.snapshot.paramMap.get("id")){
          this.StringAMapButacas(peli.butacas.toString());
          console.log(this.mapita);

        }
      });
    })
  }

}
