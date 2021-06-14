import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    PeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
