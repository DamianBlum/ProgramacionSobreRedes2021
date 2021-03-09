var Region;
(function (Region) {
    Region[Region["AR"] = 0] = "AR";
    Region[Region["CH"] = 1] = "CH";
    Region[Region["BR"] = 2] = "BR";
})(Region || (Region = {}));
var Sistema = /** @class */ (function () {
    function Sistema() {
    }
    Sistema.prototype.agregarUsuarios = function (usuario) {
        this.usuarios.push(usuario);
    };
    Sistema.prototype.agregarTitulos = function (titulo) {
        this.titulos.push(titulo);
    };
    return Sistema;
}());
var Contenido = /** @class */ (function () {
    function Contenido(duracion) {
        this.duracion = duracion;
        this.fecha = new Date();
    }
    Contenido.prototype.getDate = function () {
        return this.fecha;
    };
    Contenido.prototype.getDuracion = function () {
        return this.duracion;
    };
    return Contenido;
}());
var Titulo = /** @class */ (function () {
    function Titulo(titulo) {
        this.titulo = titulo;
    }
    Titulo.prototype.estaEnlaLista = function (region) {
        this.regiones.forEach(function (item) {
            if (region == item)
                return true;
        });
        return false;
    };
    Titulo.prototype.getTitulo = function () {
        return this.titulo;
    };
    Titulo.prototype.setTitulo = function (titulo) {
        this.titulo = titulo;
    };
    Titulo.prototype.agregarRegion = function (region) {
        if (!this.estaEnlaLista(region)) {
            this.regiones.push(region);
        }
    };
    Titulo.prototype.quitarRegion = function (region) {
        if (this.estaEnlaLista(region)) {
            var nuevasRegiones = this.regiones.filter(function (item) {
                if (item != region)
                    return item;
            });
        }
    };
    Titulo.prototype.disponible = function (region) {
        return this.estaEnlaLista(region);
    };
    return Titulo;
}());
var Pelicula = /** @class */ (function () {
    function Pelicula(parameters) {
    }
    return Pelicula;
}());
var Serie = /** @class */ (function () {
    function Serie(parameters) {
    }
    return Serie;
}());
var Usuario = /** @class */ (function () {
    function Usuario(username, region) {
        this.username = username;
        this.region = region;
    }
    Usuario.prototype.getUsername = function () {
        return this.username;
    };
    Usuario.prototype.getRegion = function () {
        return this.region;
    };
    Usuario.prototype.visto = function (titulo) {
    };
    Usuario.prototype.viendo = function (titulo) {
    };
    Usuario.prototype.capituloActual = function () {
    };
    return Usuario;
}());
