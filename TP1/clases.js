"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Usuario = exports.Serie = exports.Pelicula = exports.Titulo = exports.Contenido = exports.Sistema = exports.Region = void 0;
var Region;
(function (Region) {
    Region[Region["AR"] = 0] = "AR";
    Region[Region["CH"] = 1] = "CH";
    Region[Region["BR"] = 2] = "BR";
})(Region = exports.Region || (exports.Region = {}));
var Sistema = /** @class */ (function () {
    function Sistema() {
        this.usuarios = new Array();
        this.titulos = new Array();
    }
    Sistema.prototype.agregarUsuario = function (usuario) {
        this.usuarios.push(usuario);
    };
    Sistema.prototype.agregarTitulo = function (titulo) {
        this.titulos.push(titulo);
    };
    Sistema.prototype.buscarUsuario = function (nombre) {
        var usuarioABuscar = null;
        this.usuarios.forEach(function (item) {
            if (item.getUsername() == nombre)
                usuarioABuscar = item;
        });
        return usuarioABuscar;
    };
    Sistema.prototype.buscarTitulo = function (nombre) {
        var titulosConEseNombreAdentro;
        this.titulos.forEach(function (item) {
            if (item.getTitulo().indexOf(nombre) != -1)
                titulosConEseNombreAdentro.push(item); //cuando indexOf devuelve -1 es que no se se encuentre ese subString en el string mas grande
        });
        return titulosConEseNombreAdentro;
    };
    return Sistema;
}());
exports.Sistema = Sistema;
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
exports.Contenido = Contenido;
var Titulo = /** @class */ (function () {
    function Titulo(titulo) {
        this.titulo = titulo;
        this.regiones = new Array();
    }
    Titulo.prototype.estaEnlaLista = function (region) {
        var esta = false;
        this.regiones.forEach(function (item) {
            if (region == item)
                esta = true;
        });
        return esta;
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
exports.Titulo = Titulo;
var Pelicula = /** @class */ (function (_super) {
    __extends(Pelicula, _super);
    function Pelicula(titulo) {
        return _super.call(this, titulo) || this;
    }
    Pelicula.prototype.getContenido = function () {
        return this.contenido;
    };
    Pelicula.prototype.setContenido = function (contenido) {
        this.contenido = contenido;
    };
    return Pelicula;
}(Titulo));
exports.Pelicula = Pelicula;
var Serie = /** @class */ (function (_super) {
    __extends(Serie, _super);
    function Serie(titulo) {
        var _this = _super.call(this, titulo) || this;
        _this.capitulos = new Array();
        return _this;
    }
    Serie.prototype.getCapitulos = function () {
        return this.capitulos;
    };
    Serie.prototype.agregarCapitulo = function (capitulo) {
        this.capitulos.push(capitulo);
    };
    Serie.prototype.obtenerCapitulo = function (capitulo) {
        return this.capitulos[capitulo];
    };
    Serie.prototype.cantidadDeCapitulos = function () {
        return this.capitulos.length;
    };
    Serie.prototype.primerCapitulo = function () {
        return this.capitulos[0];
    };
    Serie.prototype.sumaDeMinutos = function () {
        var minutos = 0;
        this.capitulos.forEach(function (element) {
            minutos = minutos + element.getDuracion();
        });
        return minutos;
    };
    return Serie;
}(Titulo));
exports.Serie = Serie;
var Usuario = /** @class */ (function () {
    function Usuario(username, region) {
        this.username = username;
        this.region = region;
        this.titulos = new Map();
        this.capituloActualSerie = new Map();
    }
    Usuario.prototype.getUsername = function () {
        return this.username;
    };
    Usuario.prototype.getRegion = function () {
        return this.region;
    };
    Usuario.prototype.ver = function (titulo, tiempo_visualizado) {
        if (!titulo.disponible(this.region)) {
            return false;
        }
        if (titulo instanceof Pelicula) {
            if (!this.titulos.has(titulo)) {
                if (titulo.getContenido().getDuracion() - tiempo_visualizado <= 0) {
                    this.titulos.set(titulo, titulo.getContenido().getDuracion());
                }
                else {
                    this.titulos.set(titulo, tiempo_visualizado);
                }
            }
            else {
                var tiempo_ya_visto = this.titulos.get(titulo);
                if (titulo.getContenido().getDuracion() - tiempo_visualizado - tiempo_ya_visto <= 0) {
                    this.titulos.set(titulo, titulo.getContenido().getDuracion());
                }
                else {
                    this.titulos.set(titulo, tiempo_ya_visto + tiempo_visualizado);
                }
            }
        }
        if (titulo instanceof Serie) {
            if (!this.titulos.has(titulo)) {
                this.titulos.set(titulo, 0);
                this.capituloActualSerie.set(titulo, 0);
            }
            var tiempo_ya_visto = this.titulos.get(titulo);
            var tiempo_total = tiempo_visualizado + tiempo_ya_visto;
            for (var i = this.capituloActualSerie.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
                var capitulo_a_ver = titulo.getCapitulos()[i];
                if (capitulo_a_ver.getDuracion() <= tiempo_total) {
                    tiempo_total = tiempo_total - capitulo_a_ver.getDuracion();
                    if (i + 1 == titulo.cantidadDeCapitulos()) {
                        this.capituloActualSerie.set(titulo, 0);
                        this.titulos.set(titulo, 0);
                    }
                    else {
                        this.capituloActualSerie.set(titulo, i + 1);
                    }
                }
                else {
                    this.titulos.set(titulo, tiempo_total);
                    break;
                }
            }
        }
        return true;
    };
    Usuario.prototype.visto = function (titulo) {
        var tituloVisto = false;
        if (this.titulos.has(titulo)) {
            if (titulo instanceof Pelicula) {
                if (this.titulos.get(titulo) == titulo.getContenido().getDuracion()) {
                    tituloVisto = true;
                }
            }
            else if (titulo instanceof Serie) {
                if (this.capituloActualSerie.get(titulo) == 0 && this.titulos.get(titulo) == 0) {
                    tituloVisto = true;
                }
            }
        }
        return tituloVisto;
    };
    Usuario.prototype.viendo = function (titulo) {
        var tituloEnVista = false;
        if (this.titulos.has(titulo)) {
            if (titulo instanceof Pelicula) {
                if (this.titulos.get(titulo) != titulo.getContenido().getDuracion()) {
                    tituloEnVista = true;
                }
            }
            else if (titulo instanceof Serie) {
                if (this.capituloActualSerie.get(titulo) != 0 && this.titulos.get(titulo) != 0) {
                    tituloEnVista = true;
                }
            }
        }
        return tituloEnVista;
    };
    Usuario.prototype.capituloActual = function (serie) {
        if (serie instanceof Serie) {
            var capituloActual = this.capituloActualSerie.get(serie);
            return capituloActual;
        }
        return null;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
