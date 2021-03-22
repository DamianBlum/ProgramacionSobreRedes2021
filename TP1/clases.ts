

export enum Region {
  AR,
  CH,
  BR,
}

export class Sistema {
  private usuarios: Array<Usuario>;
  private titulos: Array<Titulo>;
  constructor(){
      this.usuarios=new Array();
      this.titulos=new Array();
  }
  agregarUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }
  agregarTitulo(titulo: Titulo): void {
    this.titulos.push(titulo);
  }
  buscarUsuario(nombre: string): Usuario {
    let usuarioABuscar:Usuario=null  
    this.usuarios.forEach((item) => {
      if (item.getUsername() == nombre) usuarioABuscar=item;
    });
    return usuarioABuscar
  }
  buscarTitulo(nombre: string): Array<Titulo> {
    let titulosConEseNombreAdentro: Array<Titulo>;
    this.titulos.forEach((item) => {
      if (item.getTitulo().indexOf(nombre) != -1)
        titulosConEseNombreAdentro.push(item); //cuando indexOf devuelve -1 es que no se se encuentre ese subString en el string mas grande
    });
    return titulosConEseNombreAdentro;
  }
}

export class Contenido {
  private fecha: Date;
  private duracion: number;
  constructor(duracion: number) {
    this.duracion = duracion;
    this.fecha = new Date();
  }
  getDate() {
    return this.fecha;
  }
  getDuracion() {
    return this.duracion;
  }
}

export class Titulo {
  private titulo: string;
  private regiones: Array<Region>;
  constructor(titulo: string) {
    this.titulo = titulo;
    this.regiones= new Array();
  }
  estaEnlaLista(region: Region): boolean {
    let esta:boolean=false;
    this.regiones.forEach((item) => {
      if (region == item) esta=true;
    });
    return esta;
  }
  getTitulo(): string {
    return this.titulo;
  }
  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }
  agregarRegion(region: Region): void {
    if (!this.estaEnlaLista(region)) {
      this.regiones.push(region);
    }
  }
  quitarRegion(region: Region): void {
    if (this.estaEnlaLista(region)) {
      const nuevasRegiones: Array<Region> = this.regiones.filter((item) => {
        if (item != region) return item;
      });
    }
  }
  disponible(region: Region): boolean {
    return this.estaEnlaLista(region);
  }
}


export class Pelicula extends Titulo {
  private contenido: Contenido;
  constructor(titulo: string) {
    super(titulo);
  }
  getContenido(): Contenido {
    return this.contenido;
  }
  setContenido(contenido: Contenido): void {
    this.contenido = contenido;
  }
}

export class Serie extends Titulo {
  private capitulos: Array<Contenido>;
  constructor(titulo: string) {
    super(titulo);
    this.capitulos= new Array();
  }
  getCapitulos():Array<Contenido>{
    return this.capitulos;
  }
  agregarCapitulo(capitulo: Contenido): void {
    this.capitulos.push(capitulo);
  }
  obtenerCapitulo(capitulo: number): Contenido {
    return this.capitulos[capitulo];
  }
  cantidadDeCapitulos(): number {
    return this.capitulos.length;
  }
  primerCapitulo(): Contenido {
    return this.capitulos[0];
  }
  sumaDeMinutos(): number{
      let minutos:number=0;
      this.capitulos.forEach(element => {
          minutos=minutos+element.getDuracion();
      });
      return minutos;
  }
}

export class Usuario {
  private username: string;
  private region: Region;
  private titulos: Map<Titulo, number>;
  private capituloActualSerie:Map<Serie,number>;
  constructor(username: string, region: Region) {
    this.username = username;
    this.region = region;
    this.titulos= new Map();
    this.capituloActualSerie= new Map();
  }

  getUsername() {
    return this.username;
  }
  getRegion() {
    return this.region;
  }
  ver(titulo: Titulo, tiempo_visualizado:number): boolean {
    if (!titulo.disponible(this.region)){
        return false;
    }  
    if (titulo instanceof Pelicula) {
        if(!this.titulos.has(titulo)){
            if(titulo.getContenido().getDuracion()-tiempo_visualizado<=0){
              this.titulos.set(titulo,titulo.getContenido().getDuracion());
            }
            else{
                this.titulos.set(titulo,tiempo_visualizado)
            }
        }
        else{
          let tiempo_ya_visto:number=this.titulos.get(titulo);
          if(titulo.getContenido().getDuracion()-tiempo_visualizado-tiempo_ya_visto<=0){
            this.titulos.set(titulo,titulo.getContenido().getDuracion());
          }
          else{   
            this.titulos.set(titulo,tiempo_ya_visto+tiempo_visualizado);
          }
        }
    }
    if(titulo instanceof Serie){
      if(!this.titulos.has(titulo)){

        this.titulos.set(titulo,0);
        this.capituloActualSerie.set(titulo,0);
      } 
      const tiempo_ya_visto:number=this.titulos.get(titulo);    
      let tiempo_total=tiempo_visualizado+tiempo_ya_visto;  
      
        for (let i = this.capituloActualSerie.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
          const capitulo_a_ver = titulo.getCapitulos()[i];
          if (capitulo_a_ver.getDuracion()<=tiempo_total) {
            tiempo_total=tiempo_total-capitulo_a_ver.getDuracion();
            if(i+1==titulo.cantidadDeCapitulos()){
              this.capituloActualSerie.set(titulo,0);
              this.titulos.set(titulo,0);
            }
            else{
              this.capituloActualSerie.set(titulo,i+1);
            }

          }
          
          else{
            this.titulos.set(titulo,tiempo_total);
            break;
          }
        }  
    }
    return true;
  }
  visto(titulo: Titulo):boolean {
    let tituloVisto:boolean=false;
    
      if (this.titulos.has(titulo)) {
        if(titulo instanceof Pelicula){

          if(this.titulos.get(titulo)==titulo.getContenido().getDuracion()){
            tituloVisto=true;
          }
        }
        else if (titulo instanceof Serie) {
          if (this.capituloActualSerie.get(titulo)==0 && this.titulos.get(titulo)==0) {
            tituloVisto=true;
          }
        }
      }
    
    return tituloVisto;
  }
  viendo(titulo: Titulo):boolean {
    let tituloEnVista:boolean=false;
    
      if (this.titulos.has(titulo)) {
        if(titulo instanceof Pelicula){
          if(this.titulos.get(titulo)!=titulo.getContenido().getDuracion()){
            tituloEnVista=true;
          }
        }
        else if (titulo instanceof Serie) {
          if (this.capituloActualSerie.get(titulo)!=0 && this.titulos.get(titulo)!=0) {
            tituloEnVista=true;
          }
        }
      }
    
    return tituloEnVista;
  }
  capituloActual(serie:Titulo):number {
    if (serie instanceof Serie) {
      const capituloActual=this.capituloActualSerie.get(serie);
      return capituloActual;
    }
    return null;
  }

}





