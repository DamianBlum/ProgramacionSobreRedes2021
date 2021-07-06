import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginaReservaComponent } from '../pagina-reserva/pagina-reserva.component';

@Component({
  selector: 'app-butaca',
  templateUrl: './butaca.component.html',
  styleUrls: ['./butaca.component.scss']
})
export class ButacaComponent implements OnInit {
  @Input() butaca:string = ''; 
  @Input() estado:string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  reservarButaca(){
    if (this.estado == "disponible"){
      document.getElementById("butaca-"+this.butaca)?.classList.remove("btn-success");
      document.getElementById("butaca-"+this.butaca)?.classList.add("btn-warning");
      this.estado = "seleccionado";
    } else if (this.estado == "seleccionado"){
      document.getElementById("butaca-"+this.butaca)?.classList.remove("btn-warning");
      document.getElementById("butaca-"+this.butaca)?.classList.add("btn-success");
      this.estado = "disponible";
    }
  }  
}