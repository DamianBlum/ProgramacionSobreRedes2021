"use strict";
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
var clases_1 = require("./clases");
var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 3000;
var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'e_commerce',
    port: "3306"
});
//JOYA
app.get('/productos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var busqueda, usado, orden, productos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                busqueda = req.query.busqueda;
                usado = req.query.usado;
                orden = req.query.orden;
                return [4 /*yield*/, clases_1.Producto
                        .where("nombre", "LIKE", "'%" + busqueda + "%'")
                        .where("usado", "=", "" + usado)
                        .orderBy("" + orden)
                        .get()];
            case 1:
                productos = _a.sent();
                res.send(Array.from(productos));
                return [2 /*return*/];
        }
    });
}); });
//JOYA
app.get('/usuarios/:id_usuario/fav', function (req, res) {
    connection.query("select * from productos join favoritos on favoritos.id_producto = productos.id where favoritos.id_usuario = " + req.params.id_usuario, function (error, results) {
        return __awaiter(this, void 0, void 0, function () {
            var favoritos_1;
            return __generator(this, function (_a) {
                if (error)
                    throw error;
                else if (results.length > 0) {
                    favoritos_1 = new Set();
                    results.forEach(function (favoritosJson) {
                        var favorito = new clases_1.Favorito(favoritosJson.id, favoritosJson.id_usuario, favoritosJson.id_producto);
                        favoritos_1.add(favorito);
                    });
                    res.send(Array.from(favoritos_1));
                }
                else {
                    console.log("No hay nada");
                    res.send("No hay nada");
                }
                return [2 /*return*/];
            });
        });
    });
});
//JOYA
app.post('/usuarios/:id_usuario/fav', function (req, res) {
    new clases_1.Favorito(null, req.params.id_usuario, req.query.id_producto).save();
    res.send("Insertado con exito");
});
//JOYA
app["delete"]('/usuarios/:id_usuario/fav', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, clases_1.Favorito.where("id_usuario", "=", "" + req.params.id_usuario).where("id_producto", "=", "" + req.query.id_producto).get()];
            case 1:
                if ((_a.sent()).size > 0) {
                    connection.query("delete from favoritos where id_usuario = " + req.params.id_usuario + " and id_producto = " + req.query.id_producto, function (error, results) {
                        if (error)
                            throw error;
                        res.send('Eliminado con exito!');
                    });
                }
                else {
                    res.send('El favortito seleccionado no existe');
                }
                return [2 /*return*/];
        }
    });
}); });
//JOYA
app.get('/usuarios/:id_usuario/compras', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var compra;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, clases_1.Compra.where("id_usuario", "=", "" + req.params.id_usuario).get()];
            case 1:
                compra = _a.sent();
                if (compra.size > 0)
                    res.send(Array.from(compra));
                else
                    res.send("El usuario seleccionado no tiene compras previas");
                return [2 /*return*/];
        }
    });
}); });
//JOYA
app.post('/usuarios/:id_usuario/compras', function (req, res) {
    new clases_1.Compra(null, req.params.id_usuario, req.query.id_producto, req.query.cantidad, new Date(), false, false).save();
    res.send("Insertado con exito");
});
//JOYA
app.get('/usuarios/:id_usuario/calificaciones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calificacionesComprador, calificacionesVendedor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, clases_1.CalificacionesComprador.where("id_comprador", "=", "" + req.params.id_usuario).get()];
            case 1:
                calificacionesComprador = _a.sent();
                return [4 /*yield*/, clases_1.CalificacionesVendedor.where("id_comprador", "=", "" + req.params.id_usuario).get()];
            case 2:
                calificacionesVendedor = _a.sent();
                calificacionesVendedor.forEach(calificacionesComprador.add, calificacionesComprador);
                res.send(Array.from(calificacionesComprador));
                return [2 /*return*/];
        }
    });
}); });
app.post('/usuarios/:id_usuario/calificaciones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCalificante, idOperacion, Calificacion, compraRecibida, productoDeLaCompra;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCalificante = req.query.id_calificante;
                idOperacion = req.query.id_operacion;
                Calificacion = req.query.calificacion;
                return [4 /*yield*/, clases_1.Compra.find(idOperacion)];
            case 1:
                compraRecibida = _a.sent();
                console.log(compraRecibida);
                console.log(compraRecibida.id_producto);
                return [4 /*yield*/, clases_1.Producto.find(compraRecibida.id_producto)];
            case 2:
                productoDeLaCompra = _a.sent();
                console.log(productoDeLaCompra);
                if (compraRecibida.id_usuario == idCalificante) {
                    //connection.query(`insert into calificaciones_vendedores values(${compraRecibida.vendedor_calificado},${productoDeLaCompra.id_vendedor},${idCalificante},${Calificacion},${compraRecibida.fecha})`,function(error,resutls){
                    //califica el comprador al vendedor
                    new clases_1.CalificacionesVendedor(null, productoDeLaCompra.vendedor, idCalificante, Calificacion, new Date()).save();
                    res.send("Insertado con exito la calificacion al vendedor");
                }
                else {
                    //connection.query(`insert into calificaciones_compradores values(${compraRecibida.comprador_calificado},${compraRecibida.id_usuario},${idCalificante},${Calificacion},${compraRecibida.fecha})`,function(error,resutls){
                    //califica el vendedor al comprador
                    new clases_1.CalificacionesComprador(null, compraRecibida.id_usuario, idCalificante, Calificacion, new Date()).save();
                    res.send("Insertado con exito la calificacion al comprador");
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
