enum Region {
    AR,
    CH,
    BR
}

class Sistema {
    private usuarios: Array<Usuario>;
    private titulos: Array<Titulo>;
    constructor() {
        
    }
    agregarUsuario(usuario:Usuario) {
        this.usuarios.push(usuario);
    }
    agregarTitulo(titulo:Titulo) {
        this.titulos.push(titulo);
    }
}

class Contenido {
    private fecha:Date
    private duracion:number
    constructor(duracion:number){
        this.duracion=duracion;
        this.fecha=new Date();
    }
    getDate(){
        return this.fecha;
    }
    getDuracion(){
        return this.duracion;
    }
}

abstract class Titulo {
    private titulo:string
    private regiones:Array<Region>
    constructor(titulo:string) {
        this.titulo=titulo;
    }
    estaEnlaLista(region:Region):boolean {
        this.regiones.forEach((item)=>{
            if(region==item) return true;
        })
        return false;
    }
    getTitulo():string{
        return this.titulo;
    }
    setTitulo(titulo:string):void{
        this.titulo=titulo;
    }
    agregarRegion(region:Region):void{

        if(!this.estaEnlaLista(region)){
            this.regiones.push(region);
        }
    }
    quitarRegion(region:Region):void{

        if(this.estaEnlaLista(region)){
            const nuevasRegiones:Array<Region>=this.regiones.filter(item =>{
                if(item!=region) return item;
            })
        }
    }
    disponible(region:Region):boolean{
        return this.estaEnlaLista(region);
    }
}

class Pelicula extends Titulo{
    private contenido:Contenido
    constructor(titulo:string) {
        super(titulo);
    }
    getContenido():Contenido{
        return this.contenido;
    }
    setContenido(contenido:Contenido):void{
        this.contenido=contenido;
    }

}

class Serie extends Titulo{
    private capitulos:Array<Contenido>
    constructor(titulo:string) {
        super(titulo);
    }
    agregarCapitulo(capitulo:Contenido):void{
        this.capitulos.push(capitulo);
    }
    obtenerCapitulo(capitulo:number):Contenido{
        return this.capitulos[capitulo];
    }
    cantidadDeCapitulos():number{
        return this.capitulos.length;
    }
    primerCapitulo():Contenido{
        return this.capitulos[0]
    }

}

class Usuario {
    private username:string;
    private region:Region;
    constructor(username:string,region:Region) {
        this.username=username;
        this.region=region;
    }
    getUsername(){
        return this.username;
    }
    getRegion(){
        return this.region;
    }
    visto(titulo:Titulo){

    }
    viendo(titulo:Titulo){

    }
    capituloActual(){
        
    }
}