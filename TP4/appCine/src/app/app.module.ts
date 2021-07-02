import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PaginaReservaComponent } from './pagina-reserva/pagina-reserva.component';
import { ButacaComponent } from './butaca/butaca.component';


@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    PeliculaComponent,
    PaginaReservaComponent,
    ButacaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
