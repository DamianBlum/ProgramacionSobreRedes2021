class Titulo {
    constructor(parameters) {
        
    }
}

class Sistema {
    private usuarios: Array<Usuario>;
    private titulos: Array<Titulo>
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

class Region {
    constructor(parameters) {
        
    }
}

class Usuario {
    constructor(username:string,region:Region) {
        
    }
}