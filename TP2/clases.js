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
exports.Compra = exports.TablaSQL = void 0;
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "laboratorio",
    port: "3306"
});
connection.connect();
var a;
var TablaSQL = /** @class */ (function () {
    function TablaSQL() {
        this.query = "";
    }
    TablaSQL.find = function (id) { };
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
    /*undefined, promise {...}*/
    Compra.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.query("select * from compras where id=" + id, function (error, results) {
                            if (error)
                                throw error;
                            else {
                                var compraJson = results[0];
                                var compra = new Compra(compraJson.id, compraJson.id_usuario, compraJson.id_producto, compraJson.cantidad, "a", compraJson.comprador_calificado, compraJson.vendedor_calificado);
                            }
                            /*console.log(compra);*/
                            return compra;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Compra;
}(TablaSQL));
exports.Compra = Compra;
(Compra.find(1)).then(function (result) { console.log(result); });
/*
export class Favorito extends TablaSQL {
  public id: number;
  public id_usuario: number;
  public id_producto: number;

  constructor(id: number, id_usuario: number, id_producto: number) {
    super();
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_producto = id_producto;
  }
}

export class Producto extends TablaSQL {
  public id: number;
  public vendedor: number;
  public nombre: string;
  public precio: number;
  public stock: number;
  public usado: boolean;

  constructor(
    id: number,
    vendedor: number,
    nombre: string,
    precio: number,
    stock: number,
    usado: boolean
  ) {
    super();
    this.id = id;
    this.vendedor = vendedor;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.usado = usado;
  }
}

export class Usuario extends TablaSQL {
  public id: number;
  public username: string;
  public saldo: number;
  public calificacion_vendedor: number;
  public calificacion_comprador: number;

  constructor(
    id: number,
    username: string,
    saldo: number,
    calificacion_vendedor: number,
    calificacion_comprador: number
  ) {
    super();
    this.id = id;
    this.username = username;
    this.saldo = saldo;
    this.calificacion_vendedor = calificacion_vendedor;
    this.calificacion_comprador = calificacion_comprador;
  }
}

export class CalificacionesVendedor extends TablaSQL {
  public id: number;
  public id_vendedor: number;
  public id_comprador: number;
  public calificacion: number;
  public fecha: Date;

  constructor(
    id: number,
    id_vendedor: number,
    id_comprador: number,
    calificacion: number,
    fecha: Date
  ) {
    super();
    this.id = id;
    this.id_vendedor = id_vendedor;
    this.id_comprador = id_comprador;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }
}

export class CalificacionesComprador extends TablaSQL {
  public id: number;
  public id_comprador: number;
  public id_vendedor: number;
  public calificacion: number;
  public fecha: string;

  constructor(
    id: number,
    id_comprador: number,
    id_vendedor: number,
    calificacion: number,
    fecha: string
  ) {
    super();
    this.id = id;
    this.id_comprador = id_comprador;
    this.id_vendedor = id_vendedor;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }

    public static find(id: number): any {
    connection.query(
        `select * from usuarios where id=${id}`,
        function (error, results) {
            console.log(results[0].username);
            return new Compra(compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id);
        }
      );
  }
    }
}
*/
