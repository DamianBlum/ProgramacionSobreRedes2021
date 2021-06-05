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
var _this = this;
var mysql = require("mysql");
var bodyParser = require("body-parser");
var port = 3305;
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cine"
});
var express = require("express");
var app = express();
//Dos Funciones para trabajar tranquilos con las butacas, nada relevante
var stringAArray = function (string) {
    var stringModificado = string
        .replace(/"/g, "")
        .replace("]", "")
        .replace("[", "")
        .replace(/ /g, "");
    var arrayNuevo = stringModificado.split(",");
    return arrayNuevo;
};
var arrayAString = function (array) {
    var nuevoString = "[\"" + array[0] + "\"";
    for (var i = 1; i < array.length; i++) {
        nuevoString += ", \"" + array[i] + "\"";
    }
    nuevoString += "]";
    return nuevoString;
};
//Para los body incluimos
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/funciones", function (req, res) {
    conn.query("select * from funciones where vigente = 1", function (error, results) {
        if (error)
            throw error;
        res.send(results);
    });
});
app.post("/:id_funcion/reservar", function (req, res) {
    var body = req.body;
    var idUsuario = body.user_id;
    var idFuncion = req.params.id_funcion;
    var arrayButacas = stringAArray(body.butacas);
    if (arrayButacas.length >= 6) {
    }
    else {
        conn.query("select vigente from funciones where id=" + idFuncion, function (error, results) {
            if (error) {
                throw error;
            }
            if (results[0].vigente == 1) {
                conn.query("select count(id) as reservo from reservas where usuario=" + idUsuario + " and funcion=" + idFuncion, function (error, results) {
                    if (error) {
                        throw error;
                    }
                    if (results[0].reservo == 0) {
                        conn.query("select butacas_disponibles from funciones where id=" + idFuncion, function (error, results) {
                            if (error) {
                                throw error;
                            }
                            var arrayButacasDisponibles = stringAArray(results[0].butacas_disponibles);
                            var butacasDisponiblesParaReservar = true;
                            arrayButacas.forEach(function (butaca) {
                                if (!arrayButacasDisponibles.includes(butaca)) {
                                    butacasDisponiblesParaReservar = false;
                                }
                            });
                            if (butacasDisponiblesParaReservar) {
                                conn.query("insert into reservas value (null, " + idUsuario + ", " + idFuncion + ", '" + arrayAString(arrayButacas) + "')", function (error) { return __awaiter(_this, void 0, void 0, function () {
                                    var butacasActualizadas_1;
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            throw error;
                                        }
                                        else {
                                            butacasActualizadas_1 = arrayButacasDisponibles;
                                            arrayButacas.forEach(function (butaca) {
                                                butacasActualizadas_1.splice(butacasActualizadas_1.indexOf(butaca), 1);
                                            });
                                            if (butacasActualizadas_1.length > 0) {
                                                conn.query("update funciones set butacas_disponibles = '" + arrayAString(butacasActualizadas_1) + "' where id = " + idFuncion, function (error) {
                                                    if (error) {
                                                        throw error;
                                                    }
                                                });
                                            }
                                            else {
                                                conn.query("update funciones set butacas_disponibles = '[]', vigente = 0", function (error) {
                                                    if (error) {
                                                        throw error;
                                                    }
                                                });
                                            }
                                            res.send("La/s butaca/s se reservaron con exito");
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                            else {
                                res.send("La/s butaca/s no estan disponibles para reservar");
                            }
                        });
                    }
                    else {
                        res.send("Ya existe una reserva");
                    }
                });
            }
            else {
                res.send("No esta disponible");
            }
        });
    }
});
app.post("/:id_funcion/cancelar_reserva", function (req, res) {
    var id_funcion = req.params.id_funcion;
    var user_id = req.body.user_id;
    conn.query("select id from reservas where usuario = " + user_id + " && funcion = " + id_funcion, function (error, results) { return __awaiter(_this, void 0, void 0, function () {
        var id_reserva_1;
        var _this = this;
        return __generator(this, function (_a) {
            if (error)
                throw error;
            else if (results.length > 0) {
                id_reserva_1 = results[0].id;
                conn.query("select butacas_reservadas from reservas inner join funciones on reservas.funcion=funciones.id where reservas.id=" + id_reserva_1 + " && (date_add(now(),interval 1 hour))<funciones.fecha", function (error2, results) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error2) return [3 /*break*/, 1];
                                throw error;
                            case 1:
                                if (!(results.length > 0)) return [3 /*break*/, 3];
                                return [4 /*yield*/, conn.query("SELECT butacas_disponibles FROM funciones inner join reservas on funciones.id=reservas.funcion WHERE reservas.id=" + id_reserva_1, function (error3, results2) { return __awaiter(_this, void 0, void 0, function () {
                                        var butacasReservadas, butacasDisponibles, butacasDisaponiblesString;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!error3) return [3 /*break*/, 1];
                                                    throw error;
                                                case 1:
                                                    butacasReservadas = stringAArray(results[0].butacas_reservadas);
                                                    butacasDisponibles = stringAArray(results2[0].butacas_disponibles);
                                                    butacasDisponibles =
                                                        butacasDisponibles.concat(butacasReservadas);
                                                    butacasDisaponiblesString = arrayAString(butacasDisponibles);
                                                    return [4 /*yield*/, conn.query("update funciones join reservas on funciones.id=reservas.funcion set butacas_disponibles='" + butacasDisaponiblesString + "' where reservas.id=" + id_reserva_1)];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, conn.query("delete from reservas where id=" + id_reserva_1)];
                                                case 3:
                                                    _a.sent();
                                                    _a.label = 4;
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                res.send("Eliminado correctamente");
                                return [3 /*break*/, 4];
                            case 3:
                                res.send("El lapso para cancelar la reserva termino o la reserva no exite.");
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
            return [2 /*return*/];
        });
    }); });
});
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
