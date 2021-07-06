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
    /*document.getElementById(this.butaca)?.style.backgroundColor="green";*/
  }
}
