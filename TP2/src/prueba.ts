import{TablaSQL,Compra,Favorito,Producto,Usuario,CalificacionesVendedor,CalificacionesComprador} from './clases';

const express = require('express');

const mysql = require('mysql');
const app = express();
const port:number = 3000;
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'e_commerce',
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

app.get('/usuarios/:id_usuario/compras', async (req,res) =>{
  let compra: Set<Compra> = await Compra.where(`id_usuario`,`=`,`${req.params.id_usuario}`).get();
  if (compra.size > 0) res.send(Array.from(compra));
  else res.send("El usuario seleccionado no tiene compras previas");
})
  
app.post('/usuarios/:id_usuario/compras', (req,res) =>{


  connection.query(`insert into compras values(null,${req.params.id_usuario},${req.params.id_usu})`,function (error, results){

  });
  
})

app.get('/usuarios/:id_usuario/calificaciones', async(req,res) =>{
  let calificacionesComprador= await CalificacionesComprador.get(); 
  let calificacionesVendedor= await CalificacionesVendedor.get();  
})

app.post('/usuarios/:id_usuario/calificaciones', async(req,res) =>{

  let idCalificante = req.query.id_calificante;
  console.log(idCalificante);
  let idOperacion = req.query.id_operacion;
  console.log(idOperacion);
  let Calificacion = req.query.calificacion;
  console.log(Calificacion);
  let compraRecibida = await Compra.find(idOperacion);
  console.log(compraRecibida);
  let productoDeLaCompra = await Producto.find(compraRecibida.id_producto);
  console.log(productoDeLaCompra);
  if(compraRecibida.id_usuario==idCalificante){
    connection.query(`insert into calificaciones_vendedores values(${compraRecibida.vendedor_calificado},${productoDeLaCompra.id_vendedor},${idCalificante},${Calificacion},${compraRecibida.fecha})`,function(error,resutls){
      if(error) throw error;

      else{
        res.send("La calificacion al vendedor se realizo correctamente");
      }
    });
  }

  else{
    connection.query(`insert into calificaciones_compradores values(${compraRecibida.comprador_calificado},${compraRecibida.id_usuario},${idCalificante},${Calificacion},${compraRecibida.fecha})`,function(error,resutls){
      if(error) throw error;

      else{
        res.send("La calificacion al comprador se realizo correctamente");
      }
      
    });
  }
  
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

async function a(){
  console.log(await Favorito.get());
}