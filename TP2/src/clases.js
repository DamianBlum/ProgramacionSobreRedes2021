"use strict";
// CONEXIÓN MYSQL
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CalificacionesComprador = exports.CalificacionesVendedor = exports.Usuario = exports.Producto = exports.Favorito = exports.Compra = exports.TablaSQL = void 0;
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "190.245.237.78",
    user: "root",
    password: "password",
    database: "ecommerce",
    port: "3306"
});
connection.connect();
// CLASE ABSTRACTA DE LA QUE DERIVAN TODAS LAS CLASES
function fechaMYSQL(fecha) {
    return "'" + fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + "'";
}
var TablaSQL = /** @class */ (function () {
    function TablaSQL() {
    }
    TablaSQL.get = function () { };
    TablaSQL.find = function (id) { };
    TablaSQL.where = function (column, conditional, value) {
        if (this.query.includes("where")) {
            this.query += " && " + column + " " + conditional + " " + value;
        }
        else {
            this.query += " where " + column + " " + conditional + " " + value;
        }
        return this;
    };
    TablaSQL.orderBy = function (value) {
        if (this.query.includes("order by")) {
            this.query += ", " + value;
        }
        else {
            this.query += " order by " + value;
        }
        return this;
    };
    TablaSQL.query = "";
    return TablaSQL;
}());
exports.TablaSQL = TablaSQL;
var Compra = /** @class */ (function (_super) {
    __extends(Compra, _super);
    function Compra(id, id_usuario, id_producto, cantidad, fecha, comprador_calificado, vendedor_calificado) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.id_usuario = id_usuario;
        _this.id_producto = id_producto;
        _this.cantidad = cantidad;
        _this.fecha = fecha;
        _this.comprador_calificado = comprador_calificado;
        _this.vendedor_calificado = vendedor_calificado;
        return _this;
    }
    Compra.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from compras " + _this.query, function (error, results) {
                var compras = new Set();
                results.forEach(function (compraJson) {
                    var compra = new Compra(compraJson.id, compraJson.id_usuario, compraJson.id_producto, compraJson.cantidad, compraJson.fecha, compraJson.comprador_calificado, compraJson.vendedor_calificado);
                    compras.add(compra);
                });
                resolve(compras);
            });
        });
    };
    Compra.find = function (id) {
        return new Promise(function (resolve, reject) {
            connection.query("select * from compras where id=" + id, function (error, results) {
                var compraJson = results[0];
                var compra = new Compra(compraJson.id, compraJson.id_usuario, compraJson.id_producto, compraJson.cantidad + 1, compraJson.fecha, compraJson.comprador_calificado, compraJson.vendedor_calificado);
                resolve(compra);
            });
        });
    };
    Compra.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM compras where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("INSERT INTO compras VALUE(null," + this.id_usuario + ", " + this.id_producto + ", " + this.cantidad + ", '" + fechaMYSQL(this.fecha) + "', " + this.comprador_calificado + ", " + this.vendedor_calificado + ")");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Compra;
}(TablaSQL));
exports.Compra = Compra;
var Favorito = /** @class */ (function (_super) {
    __extends(Favorito, _super);
    function Favorito(id, id_usuario, id_producto) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.id_usuario = id_usuario;
        _this.id_producto = id_producto;
        return _this;
    }
    Favorito.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from favoritos " + _this.query, function (error, results) {
                var favoritos = new Set();
                results.forEach(function (favoritoJson) {
                    var favorito = new Favorito(favoritoJson.id, favoritoJson.id_usuario, favoritoJson.id_producto);
                    favoritos.add(favorito);
                });
                resolve(favoritos);
            });
        });
    };
    Favorito.find = function (id) {
        return new Promise(function (resolve, reject) {
            connection.query("select * from favoritos where id=" + id, function (error, results) {
                var favoritoJson = results[0];
                var favorito = new Favorito(favoritoJson.id, favoritoJson.id_usuario, favoritoJson.id_producto);
                resolve(favorito);
            });
        });
    };
    Favorito.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM favoritos where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("INSERT INTO favoritos VALUE(" + this.id + " ," + this.id_usuario + ", " + this.id_producto + ")");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Favorito;
}(TablaSQL));
exports.Favorito = Favorito;
var Producto = /** @class */ (function (_super) {
    __extends(Producto, _super);
    function Producto(id, vendedor, nombre, precio, stock, usado) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.vendedor = vendedor;
        _this.nombre = nombre;
        _this.precio = precio;
        _this.stock = stock;
        _this.usado = usado;
        return _this;
    }
    Producto.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from productos " + _this.query, function (error, results) {
                var productos = new Set();
                results.forEach(function (productoJson) {
                    var producto = new Producto(productoJson.id, productoJson.vendedor, productoJson.nombre, productoJson.precio, productoJson.stock, productoJson.usado);
                    productos.add(producto);
                });
                resolve(productos);
            });
        });
    };
    Producto.find = function (id) {
        console.log(id);
        return new Promise(function (resolve, reject) {
            connection.query("select * from productos where id=" + id, function (error, results) {
                var productoJson = results[0];
                console.log(productoJson);
                var producto = new Producto(productoJson.id, productoJson.vendedor, productoJson.nombre, productoJson.precio, productoJson.stock, productoJson.usado);
                resolve(producto);
            });
        });
    };
    Producto.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM producto where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("INSERT INTO producto VALUE(" + this.id + " ," + this.vendedor + ", " + this.nombre + ", " + this.precio + " ," + this.stock + ", " + this.usado + ")");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Producto;
}(TablaSQL));
exports.Producto = Producto;
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario(id, username, saldo, calificacion_vendedor, calificacion_comprador) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.username = username;
        _this.saldo = saldo;
        _this.calificacion_vendedor = calificacion_vendedor;
        _this.calificacion_comprador = calificacion_comprador;
        return _this;
    }
    Usuario.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from usuarios " + _this.query, function (error, results) {
                var usuarios = new Set();
                results.forEach(function (usuarioJson) {
                    var usuario = new Usuario(usuarioJson.id, usuarioJson.username, usuarioJson.saldo, usuarioJson.calificacion_vendedor, usuarioJson.calificacion_comprador);
                    usuarios.add(usuario);
                });
                resolve(usuarios);
            });
        });
    };
    Usuario.find = function (id) {
        return new Promise(function (resolve, reject) {
            connection.query("select * from usuarios where id = " + id, function (error, results) {
                var usuarioJson = results[0];
                var usuario = new Usuario(usuarioJson.id, usuarioJson.username, usuarioJson.saldo, usuarioJson.calificacion_vendedor, usuarioJson.calificacion_comprador);
                resolve(usuario);
            });
        });
    };
    Usuario.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM usuarios where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("INSERT INTO usuarios VALUE(" + this.id + " ," + this.username + ", " + this.saldo + ", " + this.calificacion_vendedor + " ," + this.calificacion_comprador + ")");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Usuario;
}(TablaSQL));
exports.Usuario = Usuario;
var CalificacionesVendedor = /** @class */ (function (_super) {
    __extends(CalificacionesVendedor, _super);
    function CalificacionesVendedor(id, id_vendedor, id_comprador, calificacion, fecha) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.id_vendedor = id_vendedor;
        _this.id_comprador = id_comprador;
        _this.calificacion = calificacion;
        _this.fecha = fecha;
        return _this;
    }
    CalificacionesVendedor.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from calificaciones_vendedores " + _this.query, function (error, results) {
                var calificaciones_vendedores = new Set();
                results.forEach(function (calificacionVendedorJson) {
                    var calificacionVendedor = new CalificacionesVendedor(calificacionVendedorJson.id, calificacionVendedorJson.id_vendedor, calificacionVendedorJson.id_comprador, calificacionVendedorJson.calificacion, calificacionVendedorJson.fecha);
                    calificaciones_vendedores.add(calificacionVendedor);
                });
                resolve(calificaciones_vendedores);
            });
        });
    };
    CalificacionesVendedor.find = function (id) {
        return new Promise(function (resolve, reject) {
            connection.query("select * from calificaciones_vendedores where id=" + id, function (error, results) {
                var calificacionVendedorJson = results[0];
                var calificacionVendedor = new CalificacionesVendedor(calificacionVendedorJson.id, calificacionVendedorJson.id_vendedor, calificacionVendedorJson.id_comprador, calificacionVendedorJson.calificacion, calificacionVendedorJson.fecha);
                resolve(calificacionVendedor);
            });
        });
    };
    CalificacionesVendedor.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM calificaciones_vendedores where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("insert into calificaciones_vendedores values(" + this.id + "," + this.id_vendedor + "," + this.id_comprador + "," + this.calificacion + "," + fechaMYSQL(this.fecha) + ") ON DUPLICATE KEY UPDATE id_vendedor = " + this.id_vendedor + ", id_comprador = " + this.id_comprador + ", calificacion = \"" + this.calificacion + "\", fecha = '" + fechaMYSQL(this.fecha) + "'");
                        return [2 /*return*/];
                }
            });
        });
    };
    return CalificacionesVendedor;
}(TablaSQL));
exports.CalificacionesVendedor = CalificacionesVendedor;
var CalificacionesComprador = /** @class */ (function (_super) {
    __extends(CalificacionesComprador, _super);
    function CalificacionesComprador(id, id_comprador, id_vendedor, calificacion, fecha) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.id_comprador = id_comprador;
        _this.id_vendedor = id_vendedor;
        _this.calificacion = calificacion;
        _this.fecha = fecha;
        return _this;
    }
    CalificacionesComprador.find = function (id) {
        return new Promise(function (resolve, reject) {
            connection.query("select * from calificaciones_compradores where id=" + id, function (error, results) {
                var calficacionCompradorJson = results[0];
                var CalificacionDelComprador = new CalificacionesComprador(calficacionCompradorJson.id, calficacionCompradorJson.id_comprador, calficacionCompradorJson.id_vendedor, calficacionCompradorJson.calificacion, calficacionCompradorJson.fecha);
                resolve(CalificacionDelComprador);
            });
        });
    };
    CalificacionesComprador.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query("select * from calificaciones_compradores " + _this.query, function (error, results) {
                var calificaciones_compradores = new Set();
                results.forEach(function (calificacionCompradorJson) {
                    var calificacionComprador = new CalificacionesComprador(calificacionCompradorJson.id, calificacionCompradorJson.id_vendedor, calificacionCompradorJson.id_comprador, calificacionCompradorJson.calificacion, calificacionCompradorJson.fecha);
                    calificaciones_compradores.add(calificacionComprador);
                });
                resolve(calificaciones_compradores);
            });
        });
    };
    CalificacionesComprador.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("DELETE FROM calificaciones_compradores where id = " + this.id)];
                    case 1:
                        _a.sent();
                        connection.query("insert into calificaciones_compradores values(" + this.id + "," + this.id_comprador + "," + this.id_vendedor + "," + this.calificacion + "," + fechaMYSQL(this.fecha) + ")");
                        return [2 /*return*/];
                }
            });
        });
    };
    return CalificacionesComprador;
}(TablaSQL));
exports.CalificacionesComprador = CalificacionesComprador;
