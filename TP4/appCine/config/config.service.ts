import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface funcion{
  id:String;
  titulo:String;
  sala:Number;
  fecha:String;
  foto:String;
  butacas_disponibles:Array<String>;
} 


@Injectable()
export class ConfigService {
  
  readonly url:string ="http://localhost:3304";

  public peliculas:Observable<funcion[]>;
  public butacas:Observable<Array<String>> | undefined;

  constructor(private http: HttpClient) {
    this.peliculas = http.get<funcion[]>(this.url + "/funciones");
  }

  getCartelera(){
    return this.peliculas;
  }

  getSala(sala:String){
    this.butacas= this.http.get<Array<String>>(this.url + "/sala/"+sala)
    return this.butacas;
  }

}
