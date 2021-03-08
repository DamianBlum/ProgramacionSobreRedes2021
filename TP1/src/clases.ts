class Titulo {
    constructor(parameters) {
        
    }
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

class Pelicula {
    constructor(parameters) {
        
    }
}

class Serie {
    constructor(parameters) {
        
    }
}

enum Region {
    AR,
    CH,
    BR
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