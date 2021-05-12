const mysql = require('mysql');
const bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;
import * as http from 'http';
import * as bodyparser from 'body-parser';    

const cluster = require('cluster');

const pool = mysql.createPool({    //si van a haber procesos paralelos hay q usar pool
    connectionLimit: 10,   //max de hilos  
    host: "localhost",
    user: "root",
    password: "",
    database: "cine",
});

const verificacionVigente = new CronJob('0 */5 * * * *', function(){
      pool.query(`update funciones set vigente=0 where fecha BETWEEN now() and (date_add(now(),interval 5 minute)) && vigente=1`)
});
verificacionVigente.start();

const stringAArray = (string: String): Array<String> =>{
    let stringModificado: String = string.replace(/"/g,"").replace("]","").replace("[","").replace(/ /g,"");
    let arrayNuevo: Array <String> = stringModificado.split(",");  
    return arrayNuevo;    
};
const arrayAString = (array: Array<String>): String =>{
    let nuevoString = `["${array[0]}"`;
    
    for(let i: number = 1; i < array.length; i++){
        nuevoString += `, "${array[i]}"`;
    }

    nuevoString += "]";
    return nuevoString;
};

if(cluster.isWorker){
    
    process.on('message', (bodyReserva, idFuncion) => {
        
        pool.getConnection( (error1, conn) => {
            if (error1) {
                throw error1;
            }
            conn.beginTransaction( (error2) => {
                if (error2) {throw error2}

                let idUsuario:number = bodyReserva.user_id;
                let arrayButacas:Array <String> = stringAArray(bodyReserva.butacas);
                
                if (arrayButacas.length >= 6){
                    
                    process.kill(process.pid);    
                }
                 
                conn.commit(() => {
                    conn.release(); 
                    process.kill(process.pid);
                });
                
                conn.query(`select vigente from funciones where id=${idFuncion}`, (error,results) =>{
                    if (results) {
                        conn.query(`select count(id) from reservas where usuario=${idUsuario} and funcion=${idFuncion}`, (error,results) =>{
                            if(results==0) {
                                conn.query(`select butacas_disponibles from funciones where id=1`, (error,results) => {
                                    if(error){
                                        throw error;
                                    }
                                    let arrayButacasDisponibles: Array<String> = stringAArray(results[0].butacas_disponibles);
                                    let butacasDisponiblesParaReservar: boolean = true;
                                    arrayButacas.forEach(butaca => {
                                        if(!arrayButacasDisponibles.includes(butaca)){
                                            butacasDisponiblesParaReservar = false;
                                        }
                                    });
                                    if(butacasDisponiblesParaReservar){
                                        conn.query(`insert into reservas value (null, ${idUsuario}, ${idFuncion}, ${arrayButacas})`, (error) => {
                                            if (error) throw error;
                                            else {
                                                let butacasActualizadas: Array<String> = arrayButacasDisponibles;
                                                
                                                arrayButacas.forEach(butaca => {
                                                    butacasActualizadas.splice(butacasActualizadas.indexOf(butaca),1);
                                                });

                                                if (butacasActualizadas.length > 0){
                                                    conn.query(`update funciones set butacas_dispoibles = ${arrayAString(butacasActualizadas)}`, (error) => {
                                                        if (error) throw error;
                                                    });
                                                } else {
                                                    conn.query(`update funciones set butacas_dispoibles = '[]', vigente = 0`, (error) => {
                                                        if (error) throw error;
                                                    });
                                                }
                                            }
                                        });
                                    } 
                                });
                            }
                        });
                    }
                });
            });
        });
    });

} else {
    const port:number = 3305; 
    const cluster = require('cluster');
    const bodyParser = require('body-parser');

    var express = require('express');
    var app = express();
    const server: http.Server = http.createServer(app);
  
    app.use(express.json());
    
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/funciones',(req,res) =>{
        pool.query(`select * from funciones where vigente = 1`, async (error,results) =>{
            if(error) throw error;
            res.send(results);
        });
    })
    
    app.post('/{id_funcion}/reservar', (req,res) =>{
        const worker = cluster.fork();
        
        worker.send(req.body, req.query.id_funcion);
        worker.on('message', (result) => {
            res.status(200).send(result);
        });
    });    
    
    
    app.listen(port, () =>{
        console.log(`App listening at http://localhost:${port}`)
    });

    app.post('/{id_funcion}/cancelar_reserva', (req,res) =>{
        let id_funcion:number = req.query.id_reserva;
        let user_id:number = req.body.user_id;

        pool.query(`select id from reservas where usuario = ${user_id} && funcion = ${id_funcion}`,async (error,results) =>{
            if(error) throw error;
            else if (results.length > 0){
                let id_reserva: number = results[0].id;
                pool.query(`select butacas_reservadas from reservas inner join funciones on reservas.funcion=funciones.id where reservas.id=${id_reserva} && (date_add(now(),interval 1 hour))<funciones.fecha`, async (error2,results) =>{
                    if(error2) throw error;
                    else if (results.length > 0){
                        await pool.query(`SELECT butacas_disponibles FROM funciones inner join reservas on funciones.id=reservas.funcion WHERE reservas.id=${id_reserva}`, async (error3,results2) =>{
                            if(error3) throw error;
                            else{  
                                console.log("MEGA UWU");
                                let butacasReservadas: Array<String> = stringAArray(results[0].butacas_reservadas);
                                let butacasDisponibles: Array<String> = stringAArray(results2[0].butacas_disponibles);
                                console.log(butacasReservadas);
                                console.log(butacasDisponibles);
                                butacasDisponibles=butacasDisponibles.concat(butacasReservadas);
                                let butacasDisaponiblesString : String = arrayAString(butacasDisponibles);
                                console.log(butacasDisaponiblesString);
                                await pool.query(`update funciones join reservas on funciones.id=reservas.funcion set butacas_disponibles='${butacasDisaponiblesString}' where reservas.id=${id_reserva}`);
                                await pool.query(`delete from reservas where id=${id_reserva}`);
                            }
                        });
                        res.send("Eliminado correctamente");
                    }
                    else{res.send("El lapso para cancelar la reserva termino o la reserva no exite.");}
                });
            }
        });
    });
}