import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-butaca',
  templateUrl: './butaca.component.html',
  styleUrls: ['./butaca.component.scss']
})
export class ButacaComponent implements OnInit {
  @Input() butaca:string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

}
