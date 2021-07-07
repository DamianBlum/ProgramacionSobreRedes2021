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

  public mapita : Map<String,Map<String,String>> = new Map();
  public pelicula!: funcion; 

  ConseguirButacasDisponiblesYNo(butacas:String,butacas_disponibles:String): void{
    butacas = butacas
    .replace(/"/g, "")
    .replace("]", "")
    .replace("[", "")
    .replace(/ /g, "");

    butacas_disponibles=butacas_disponibles    
    .replace(/"/g, "")
    .replace("]", "")
    .replace("[", "")
    .replace(/ /g, "");

    let array_butacas_disponibles=butacas_disponibles.split(","); 

    butacas.split(",").forEach(element => {
      if (this.mapita.has(element[0])){

        if (array_butacas_disponibles.includes(element)) {
          this.mapita.get(element[0])?.set(element[1],"disponible");
        } else{
          this.mapita.get(element[0])?.set(element[1],"reservado");
        }
      } else {
        let mapAux: Map<String,String>= new Map();
        if (array_butacas_disponibles.includes(element)) {
          this.mapita.set(element[0],mapAux.set(element[1],"disponible"));  
        } else{
          this.mapita.set(element[0],mapAux.set(element[1],"reservado"));
        }
        
      }
    });
        //

  }

  ngOnInit(): void {

    this.conf.getCartelera().subscribe((dataPeli)=>{
      dataPeli.forEach(peli => {
        if(peli.id == this.route.snapshot.paramMap.get("id")){
          this.pelicula=peli;
          this.ConseguirButacasDisponiblesYNo(peli.butacas.toString(),peli.butacas_disponibles.toString());
        }
      });
    })
  }

  reservar():void {
    let butacas_seleccionadas: Array<String> = []
    Array.from(document.getElementsByClassName('btn-warning')).forEach(butacaSeleccionada => {
      butacas_seleccionadas.push(butacaSeleccionada.innerHTML);
    })
    this.conf.prueba(this.pelicula.id,butacas_seleccionadas.toString());
    console.log(this.pelicula.id,butacas_seleccionadas.toString());
    
  }
}
