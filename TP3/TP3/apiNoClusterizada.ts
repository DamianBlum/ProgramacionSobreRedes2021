const mysql = require("mysql");
const bodyParser = require("body-parser");
const port: number = 3305;

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cine",
});

var express = require("express");
var app = express();

//Dos Funciones para trabajar tranquilos con las butacas, nada relevante
const stringAArray = (string: String): Array<String> => {
  let stringModificado: String = string
    .replace(/"/g, "")
    .replace("]", "")
    .replace("[", "")
    .replace(/ /g, "");
  let arrayNuevo: Array<String> = stringModificado.split(",");
  return arrayNuevo;
};
const arrayAString = (array: Array<String>): String => {
  let nuevoString = `["${array[0]}"`;

  for (let i: number = 1; i < array.length; i++) {
    nuevoString += `, "${array[i]}"`;
  }

  nuevoString += "]";
  return nuevoString;
};

//Para los body incluimos
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/funciones", (req, res) => {
  conn.query(`select * from funciones where vigente = 1`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/:id_funcion/reservar", (req, res) => {
  let body = req.body;
  let idUsuario: number = body.user_id;
  let idFuncion: number = req.params.id_funcion;
  let arrayButacas: Array<String> = stringAArray(body.butacas);
  if (arrayButacas.length >= 6) {
  } else {
    conn.query(
      `select vigente from funciones where id=${idFuncion}`,
      (error, results) => {
        if (error) {
          throw error;
        }

        if (results[0].vigente == 1) {
          conn.query(
            `select count(id) as reservo from reservas where usuario=${idUsuario} and funcion=${idFuncion}`,
            (error, results) => {
              if (error) {
                throw error;
              }

              if (results[0].reservo == 0) {
                conn.query(
                  `select butacas_disponibles from funciones where id=${idFuncion}`,
                  (error, results) => {
                    if (error) {
                      throw error;
                    }
                    let arrayButacasDisponibles: Array<String> = stringAArray(
                      results[0].butacas_disponibles
                    );
                    let butacasDisponiblesParaReservar: boolean = true;

                    arrayButacas.forEach((butaca) => {
                      if (!arrayButacasDisponibles.includes(butaca)) {
                        butacasDisponiblesParaReservar = false;
                      }
                    });

                    if (butacasDisponiblesParaReservar) {
                      conn.query(
                        `insert into reservas value (null, ${idUsuario}, ${idFuncion}, '${arrayAString(arrayButacas)}')`,
                        async (error) => {
                          if (error) {
                            throw error;
                          } else {
                            let butacasActualizadas: Array<String> =
                              arrayButacasDisponibles;
                            arrayButacas.forEach((butaca) => {
                              butacasActualizadas.splice(
                                butacasActualizadas.indexOf(butaca),
                                1
                              );
                            });
                            if (butacasActualizadas.length > 0) {
                              conn.query(
                                `update funciones set butacas_disponibles = '${arrayAString(
                                  butacasActualizadas
                                )}' where id = ${idFuncion}`,
                                (error) => {
                                  if (error) {
                                    throw error;
                                  }
                                }
                              );
                            } else {
                              conn.query(
                                `update funciones set butacas_disponibles = '[]', vigente = 0`,
                                (error) => {
                                  if (error) {
                                    throw error;
                                  }
                                }
                              );
                            }
                            res.send("La/s butaca/s se reservaron con exito");
                          }
                        }
                      );
                    } else {
                      res.send(
                        "La/s butaca/s no estan disponibles para reservar"
                      );
                    }
                  }
                );
              } else {
                res.send("Ya existe una reserva");
              }
            }
          );
        } else {
          res.send("No esta disponible");
        }
      }
    );
  }
});

app.post("/:id_funcion/cancelar_reserva", (req, res) => {
  let id_funcion: number = req.params.id_funcion;
  let user_id: number = req.body.user_id;

  conn.query(
    `select id from reservas where usuario = ${user_id} && funcion = ${id_funcion}`,
    async (error, results) => {
      if (error) throw error;
      else if (results.length > 0) {
        let id_reserva: number = results[0].id;
        conn.query(
          `select butacas_reservadas from reservas inner join funciones on reservas.funcion=funciones.id where reservas.id=${id_reserva} && (date_add(now(),interval 1 hour))<funciones.fecha`,
          async (error2, results) => {
            if (error2) throw error;
            else if (results.length > 0) {
              await conn.query(
                `SELECT butacas_disponibles FROM funciones inner join reservas on funciones.id=reservas.funcion WHERE reservas.id=${id_reserva}`,
                async (error3, results2) => {
                  if (error3) throw error;
                  else {
                    let butacasReservadas: Array<String> = stringAArray(
                      results[0].butacas_reservadas
                    );
                    let butacasDisponibles: Array<String> = stringAArray(
                      results2[0].butacas_disponibles
                    );
                    butacasDisponibles =
                      butacasDisponibles.concat(butacasReservadas);
                    let butacasDisaponiblesString: String =
                      arrayAString(butacasDisponibles);
                    await conn.query(
                      `update funciones join reservas on funciones.id=reservas.funcion set butacas_disponibles='${butacasDisaponiblesString}' where reservas.id=${id_reserva}`
                    );
                    await conn.query(
                      `delete from reservas where id=${id_reserva}`
                    );
                  }
                }
              );
              res.send("Eliminado correctamente");
            } else
              res.send(
                "El lapso para cancelar la reserva termino o la reserva no exite."
              );
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
