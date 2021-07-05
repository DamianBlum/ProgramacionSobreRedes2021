import { Component, OnInit } from '@angular/core';
import { ConfigService, funcion } from 'config/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-pagina-reserva',
  templateUrl: './pagina-reserva.component.html',
  styleUrls: ['./pagina-reserva.component.scss'],
  providers: [ConfigService]
})

export class PaginaReservaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private conf:ConfigService) { }

  public pelicula:funcion | undefined; 

  ngOnInit(): void {
    /*this.conf.getCartelera().subscribe((dataPeli)=>{
      dataPeli.forEach(peli => {
        if(peli.id == this.route.snapshot.paramMap.get("id")){
          this.conf.getSala().subscribe((dataSala)=>{
            dataSala.forEach(sala => {
              if(sala.id == this.route.snapshot.paramMap.get("id")){
                
              }
            });
          })
        }
      });
    })*/
  }

}
