const mysql = require("mysql");
const cluster = require("cluster");

//Si van a haber procesos paralelos hay q usar pool
const pool = mysql.createPool({
  connectionLimit: 10, //max de hilos
  host: "localhost",
  user: "root",
  password: "password",
  database: "cine",
});

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

//Funcion que reserva como tal
const reservar = (
  idUsuario: number,
  arrayButacas: Array<String>,
  idFuncion: number,
  conn
): Promise<String> => {
  return new Promise((resolve) => {
    conn.query(
      `select vigente from funciones where id=${idFuncion} FOR UPDATE`,
      (error, results) => {
        if (error) {
          return conn.rollback(function () {
            throw error;
          });
        }

        if (results[0].vigente == 1) {
          conn.query(
            `select count(id) as reservo from reservas where usuario=${idUsuario} and funcion=${idFuncion}`,
            (error, results) => {
              if (error) {
                return conn.rollback(function () {
                  throw error;
                });
              }

              if (results[0].reservo == 0) {
                conn.query(
                  `select butacas_disponibles from funciones where id=${idFuncion}`,
                  (error, results) => {
                    if (error) {
                      return conn.rollback(function () {
                        throw error;
                      });
                    }

                    let arrayButacasDisponibles: Array<String> = stringAArray(
                      results[0].butacas_disponibles
                    );
                    console.log("Aca estan las butacas disponibles: "+arrayButacasDisponibles);

                    let butacasDisponiblesParaReservar: boolean = true;

                    arrayButacas.forEach((butaca) => {
                      if (!arrayButacasDisponibles.includes(butaca)) {
                        butacasDisponiblesParaReservar = false;
                      }
                    });

                    if (butacasDisponiblesParaReservar) {
                      conn.query(
                        `insert into reservas value (null, ${idUsuario}, ${idFuncion}, '${arrayAString(
                          arrayButacas
                        )}')`,
                        async (error) => {
                          if (error) {
                            return conn.rollback(function () {
                              throw error;
                            });
                          } else {
                            let butacasActualizadas: Array<String> =
                              arrayButacasDisponibles;

                            console.log(arrayButacas);
                            console.log(butacasActualizadas);

                            arrayButacas.forEach((butaca) => {
                              butacasActualizadas.splice(
                                butacasActualizadas.indexOf(butaca),1
                              );
                            });

                            console.log(butacasActualizadas);
                            
                            if (butacasActualizadas.length > 0) {
                              conn.query(
                                `update funciones set butacas_disponibles = '${arrayAString(butacasActualizadas)}' where id = ${idFuncion}`,
                                (error) => {
                                  if (error) {
                                    return conn.rollback(function () {
                                      throw error;
                                    });
                                  }
                                }
                              );
                            } else {
                              conn.query(
                                `update funciones set butacas_disponibles = '[]', vigente = 0 where id = ${idFuncion}`,
                                (error) => {
                                  if (error) {
                                    return conn.rollback(function () {
                                      throw error;
                                    });
                                  }
                                }
                              );
                            }
                            resolve("La/s butaca/s se reservaron con exito");
                          }
                        }
                      );
                    } else {
                      resolve(
                        "La/s butaca/s no estan disponibles para reservar"
                      );
                    }
                  }
                );
              } else {
                resolve("Ya existe una reserva");
              }
            }
          );
        } else {
          resolve("No esta disponible");
        }
      }
    );
  });
};

//Chequeamos si se trata de un worker o no
if (cluster.isWorker) {
  process.on("message", (bodyReserva) => {
    pool.getConnection((error, conn) => {
      if (error) {
        throw error;
      }
      conn.beginTransaction(async (error) => {
        if (error) {
          throw error;
        }

        let idUsuario: number = bodyReserva.user_id;
        let idFuncion: number = bodyReserva.id_funcion;
        let arrayButacas: Array<String> = stringAArray(bodyReserva.butacas);
        console.log("Aca estan las butacas que le manda el flaco: "+arrayButacas);

        if (arrayButacas.length >= 6) {
          process.send("No se pueden reservar mas de 5 butacas a la vez");
          process.kill(process.pid);
        }

        //Necesitamos hacerlo ASINCRONO, para que espere al resultado antes de enviarlo
        let resultado: String = await reservar(
          idUsuario,
          arrayButacas,
          idFuncion,
          conn
        );

        //Fin de la transaccion
        conn.commit((error) => {
          if (error) {
            return conn.rollback(function () {
              throw error;
            });
          }
          //Fin de la conexion
          conn.release();
          process.send(resultado);
          process.kill(process.pid);
        });
      });
    });
  });
} else {
  const port: number = 3304;
  const cluster = require("cluster");
  const bodyParser = require("body-parser");

  var express = require("express");
  var app = express();

  //Para los body incluimos
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/funciones", (req, res) => {
    pool.query(
      `select funciones.id, titulo, fecha,sala,butacas_disponibles,vigente,foto,butacas  from funciones join salas on salas.id=funciones.sala where vigente = 1 `,
      async (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  });


  app.post("/:id_funcion/reservar", (req, res) => {


    const worker = cluster.fork();

    let body = req.body;
    body.id_funcion = req.params.id_funcion;
    

    worker.send(body);
    worker.on("message", (result) => {
      res.status(200).send(result);
    });
  });

  app.post("/:id_funcion/cancelar_reserva", (req, res) => {
    let id_funcion: number = req.params.id_funcion;
    let user_id: number = req.body.user_id;

    pool.query(
      `select id from reservas where usuario = ${user_id} && funcion = ${id_funcion}`,
      async (error, results) => {
        if (error) throw error;
        else if (results.length > 0) {
          let id_reserva: number = results[0].id;
          pool.query(
            `select butacas_reservadas from reservas inner join funciones on reservas.funcion=funciones.id where reservas.id=${id_reserva} && (date_add(now(),interval 1 hour))<funciones.fecha`,
            async (error2, results) => {
              if (error2) throw error;
              else if (results.length > 0) {
                await pool.query(
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
                      await pool.query(
                        `update funciones join reservas on funciones.id=reservas.funcion set butacas_disponibles='${butacasDisaponiblesString}' where reservas.id=${id_reserva}`
                      );
                      await pool.query(
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
}
