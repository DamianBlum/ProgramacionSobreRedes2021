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
    agregarUsuarios(usuario:Usuario) {
        this.usuarios.push(usuario);
    }
    agregarTitulos(titulo:Titulo) {
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
        this.titulo=titulo
    }
    estaEnlaLista(region:Region):boolean {
        this.regiones.forEach((item)=>{
            if(region==item) return true
        })
        return false
    }
    getTitulo(){
        return this.titulo
    }
    setTitulo(titulo:string){
        this.titulo=titulo
    }
    agregarRegion(region:Region){

        if(!this.estaEnlaLista(region)){
            this.regiones.push(region)
        }
    }
    quitarRegion(region:Region){

        if(this.estaEnlaLista(region)){
            const nuevasRegiones:Array<Region>=this.regiones.filter(item =>{
                if(item!=region) return item 
            })
        }
    }
    disponible(region:Region){
        return this.estaEnlaLista(region)
    }
}

class Pelicula {
    constructor(parameters) {
        
    }
}

class Serie {
    constructor(parameters) {
        
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