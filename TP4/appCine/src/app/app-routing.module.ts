import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

const routes: Routes = [
  {path: 'cartelera-component', component: CarteleraComponent},
  {path: 'pelicula-component', component: PeliculaComponent}
];
// 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
