import{TablaSQL,Compra,Favorito,Producto,Usuario,CalificacionesVendedor,CalificacionesComprador} from './clases';

const express = require('express');

const mysql = require('mysql');
const app = express();
const port:number = 3000;
const connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : '9qxK1qwW4p',
  password : 'udOmPxGcb9',
  database : '9qxK1qwW4p',
  port:"3306"
});

//JOYA
app.get('/productos', async(req,res) =>{
  
  let busqueda = req.query.busqueda;
  let usado = req.query.usado;
  let orden = req.query.orden;
  
  let productos: Set<Producto> = await Producto
    .where(`nombre`,`LIKE`,`'%${busqueda}%'`)
    .where(`usado`,`=`,`${usado}`)
    .orderBy(`${orden}`)
    .get();
  res.send(Array.from(productos));

});

//JOYA
app.get('/usuarios/:id_usuario/fav', (req, res) => {
    
  connection.query(`select * from productos join favoritos on favoritos.id_producto = productos.id where favoritos.id_usuario = ${req.params.id_usuario}`, async function (error, results) {
    
    if(error) throw error;

    else if (results.length > 0){

      let favoritos: Set<Favorito> = new Set<Favorito>();
      
      results.forEach(favoritosJson => {
        let favorito: Favorito = new Favorito(
          favoritosJson.id,
          favoritosJson.id_usuario,
          favoritosJson.id_producto
        );
        favoritos.add(favorito);
      });
      res.send(Array.from(favoritos));
    }
    
    else{
      console.log("No hay nada");
      res.send("No hay nada");
    }
  });
});

//JOYA
app.post('/usuarios/:id_usuario/fav', (req, res) => {
  new Favorito(null, req.params.id_usuario, req.query.id_producto).save();
  res.send("Insertado con exito");
})

//JOYA
app.delete('/usuarios/:id_usuario/fav', async (req,res) => {
  if ((await Favorito.where(`id_usuario`,`=`,`${req.params.id_usuario}`).where(`id_producto`,`=`,`${req.query.id_producto}`).get()).size > 0){
    connection.query(`delete from favoritos where id_usuario = ${req.params.id_usuario} and id_producto = ${req.query.id_producto}`,function (error, results){
      if(error) throw error;
      res.send('Eliminado con exito!');
    });
  } else {
    res.send('El favortito seleccionado no existe');
  }
})

//JOYA
app.get('/usuarios/:id_usuario/compras', async (req,res) =>{
  let compra: Set<Compra> = await Compra.where(`id_usuario`,`=`,`${req.params.id_usuario}`).get();
  if (compra.size > 0) res.send(Array.from(compra));
  else res.send("El usuario seleccionado no tiene compras previas");
})

//JOYA
app.post('/usuarios/:id_usuario/compras', (req,res) =>{

  new Compra(null,req.params.id_usuario,req.query.id_producto,req.query.cantidad,new Date(),false,false).save()
  res.send("Insertado con exito");

})

//JOYA
app.get('/usuarios/:id_usuario/calificaciones', async(req,res) =>{
  let calificacionesComprador:Set<CalificacionesComprador>= await CalificacionesComprador.where(`id_comprador`,`=`,`${req.params.id_usuario}`).get(); 
  let calificacionesVendedor:Set<CalificacionesVendedor>= await CalificacionesVendedor.where(`id_comprador`,`=`,`${req.params.id_usuario}`).get(); 

  calificacionesVendedor.forEach(calificacionesComprador.add, calificacionesComprador);

  res.send( Array.from(calificacionesComprador));
})

app.post('/usuarios/:id_usuario/calificaciones', async(req,res) =>{

  let idCalificante = req.query.id_calificante;
  let idOperacion = req.query.id_operacion;
  let Calificacion = req.query.calificacion;
  let compraRecibida = await Compra.find(idOperacion);
  let productoDeLaCompra = await Producto.find(compraRecibida.id_producto);
  if(compraRecibida.id_usuario==idCalificante){
    new CalificacionesVendedor(null,productoDeLaCompra.vendedor,idCalificante,Calificacion,new Date()).save();
    res.send("Insertado con exito la calificacion al vendedor");
  }
  else{
    new CalificacionesComprador(null,compraRecibida.id_usuario,idCalificante,Calificacion,new Date()).save();
    res.send("Insertado con exito la calificacion al comprador");
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})