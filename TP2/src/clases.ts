// CONEXIÓN MYSQL

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "e_commerce",
  port: "3306",
});
connection.connect();

// CLASE ABSTRACTA DE LA QUE DERIVAN TODAS LAS CLASES

function fechaMYSQL(fecha:Date): string {
  return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} ${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
}

export abstract class TablaSQL {
  protected static query: string = "";

  constructor() {}

  public static get() {}

  public static find(id: number) {}

  public static where(
    column: string,
    conditional: string,
    value: string
  ): any {
    if (this.query.includes("where")) {
      this.query += ` && ${column} ${conditional} ${value}`;
    } else {
      this.query += ` where ${column} ${conditional} ${value}`;
    }
    return this;
  }

  public static orderBy(value: string): any {
    if (this.query.includes("order by")) {
      this.query += `, ${value}`;
    } else {
      this.query += ` order by ${value}`;
    }
    return this;
  }
}


export class Compra extends TablaSQL {
  public id: number;
  public id_usuario: number;
  public id_producto: number;
  public cantidad: number;
  public fecha: Date;
  public comprador_calificado: boolean;
  public vendedor_calificado: boolean;

  constructor(
    id: number,
    id_usuario: number,
    id_producto: number,
    cantidad: number,
    fecha: Date,
    comprador_calificado: boolean,
    vendedor_calificado: boolean
  ) {
    super();
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_producto = id_producto;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.comprador_calificado = comprador_calificado;
    this.vendedor_calificado = vendedor_calificado;
  }
  
  public static get(): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from compras ${this.query}`,
        function (error, results) {
          
          let compras: Set<Compra> = new Set<Compra>();
          
          results.forEach(compraJson =>{
            let compra: Compra = new Compra(
              compraJson.id,
              compraJson.id_usuario,
              compraJson.id_producto,
              compraJson.cantidad,
              compraJson.fecha,
              compraJson.comprador_calificado,
              compraJson.vendedor_calificado
            );
            compras.add(compra);
            
          });
          
          resolve(compras);
        }
      );
    });
  }

  public static find(id: number): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from compras where id=${id}`,
        function (error, results) {
          let compraJson = results[0];

          var compra: Compra = new Compra(
            compraJson.id,
            compraJson.id_usuario,
            compraJson.id_producto,
            compraJson.cantidad + 1,
            compraJson.fecha,
            compraJson.comprador_calificado,
            compraJson.vendedor_calificado
          );

          resolve(compra);
        }
      );
    });
  }

  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM compras where id = ${this.id}`
    );
    connection.query(
      `INSERT INTO compras VALUE(null,${this.id_usuario}, ${this.id_producto}, ${this.cantidad}, '${fechaMYSQL(this.fecha)}', ${this.comprador_calificado}, ${this.vendedor_calificado})`
    );
  }

}

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

  public static get(): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from favoritos ${this.query}`,
        function (error, results) {

          let favoritos: Set<Favorito> = new Set<Favorito>();

          results.forEach(favoritoJson =>{
            let favorito: Favorito = new Favorito(
              favoritoJson.id,
              favoritoJson.id_usuario,
              favoritoJson.id_producto
            );
            favoritos.add(favorito);
            
          });
          
          resolve(favoritos);
        }
      );
    });
  }

  public static find(id: number): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from favoritos where id=${id}`,
        function (error, results) {
          let favoritoJson = results[0];
          var favorito: Favorito = new Favorito(
            favoritoJson.id,
            favoritoJson.id_usuario,
            favoritoJson.id_producto
          );

          resolve(favorito);
        }
      );
    });
  }

  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM favoritos where id = ${this.id}`
    );
    connection.query(
      `INSERT INTO favoritos VALUE(${this.id} ,${this.id_usuario}, ${this.id_producto})`
    );
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

  public static get(): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from productos ${this.query}`,
        function (error, results) {

          let productos: Set<Producto> = new Set<Producto>();

          results.forEach(productoJson =>{
            let producto : Producto = new Producto(
              productoJson.id,
              productoJson.vendedor,
              productoJson.nombre,
              productoJson.precio,
              productoJson.stock,
              productoJson.usado
            );
            productos.add(producto);
            
          });
          
          resolve(productos);
        }
      );
    });
  }

  public static find(id: number): any {
    console.log(id);
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from productos where id=${id}`,
        function (error, results) {
          let productoJson = results[0];
          console.log(productoJson);
          let producto: Producto = new Producto(
            productoJson.id,
            productoJson.vendedor,
            productoJson.nombre,
            productoJson.precio,
            productoJson.stock,
            productoJson.usado
          );

          resolve(producto);
        }
      );
    });
  }

  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM producto where id = ${this.id}`
    );
    connection.query(
      `INSERT INTO producto VALUE(${this.id} ,${this.vendedor}, ${this.nombre}, ${this.precio} ,${this.stock}, ${this.usado})`
    );
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

  public static get(): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from usuarios ${this.query}`,
        function (error, results) {

          let usuarios: Set<Usuario> = new Set<Usuario>();
          
          results.forEach(usuarioJson =>{
            let usuario : Usuario = new Usuario(
              usuarioJson.id,
              usuarioJson.username,
              usuarioJson.saldo,
              usuarioJson.calificacion_vendedor,
              usuarioJson.calificacion_comprador
            );
            usuarios.add(usuario);
            
          });
          
          resolve(usuarios);
        }
      );
    });
  }

  public static find(id: number): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from usuarios where id = ${id}`,
        function (error, results) {
          let usuarioJson = results[0];
          var usuario: Usuario = new Usuario(
            usuarioJson.id,
            usuarioJson.username,
            usuarioJson.saldo,
            usuarioJson.calificacion_vendedor,
            usuarioJson.calificacion_comprador
          );

          resolve(usuario);
        }
      );
    });
  }

  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM usuarios where id = ${this.id}`
    );
    connection.query(
      `INSERT INTO usuarios VALUE(${this.id} ,${this.username}, ${this.saldo}, ${this.calificacion_vendedor} ,${this.calificacion_comprador})`
    );
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

  public static get(): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from calificaciones_vendedores ${this.query}`,
        function (error, results) {
          let calificaciones_vendedores: Set<CalificacionesVendedor> = new Set<CalificacionesVendedor>();

          results.forEach(calificacionVendedorJson => {
            var calificacionVendedor: CalificacionesVendedor = new CalificacionesVendedor(
              calificacionVendedorJson.id,
              calificacionVendedorJson.id_vendedor,
              calificacionVendedorJson.id_comprador,
              calificacionVendedorJson.calificacion,
              calificacionVendedorJson.fecha
            );
            calificaciones_vendedores.add(calificacionVendedor);
          });


          resolve(calificaciones_vendedores);
        }
      );
    });
  }
  
  public static find(id: number): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from calificaciones_vendedores where id=${id}`,
        function (error, results) {
          let calificacionVendedorJson = results[0];
          var calificacionVendedor: CalificacionesVendedor = new CalificacionesVendedor(
            calificacionVendedorJson.id,
            calificacionVendedorJson.id_vendedor,
            calificacionVendedorJson.id_comprador,
            calificacionVendedorJson.calificacion,
            calificacionVendedorJson.fecha
          );

          resolve(calificacionVendedor);
        }
      );
    });
  }

  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM calificaciones_vendedores where id = ${this.id}`
    );
    connection.query(
      `insert into calificaciones_vendedores values(${this.id},${this.id_vendedor},${this.id_comprador},${this.calificacion},${fechaMYSQL(this.fecha)}) ON DUPLICATE KEY UPDATE id_vendedor = ${this.id_vendedor}, id_comprador = ${this.id_comprador}, calificacion = "${this.calificacion}", fecha = '${fechaMYSQL(this.fecha)}'`
    );
  }
}

export class CalificacionesComprador extends TablaSQL {
  public id: number;
  public id_comprador: number;
  public id_vendedor: number;
  public calificacion: number;
  public fecha: Date;

  constructor(
    id: number,
    id_comprador: number,
    id_vendedor: number,
    calificacion: number,
    fecha: Date
  ) {
    super();
    this.id = id;
    this.id_comprador = id_comprador;
    this.id_vendedor = id_vendedor;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }

  public static find(id: number): any {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from calificaciones_compradores where id=${id}`,
        function (error, results) {
          let calficacionCompradorJson = results[0];

          var CalificacionDelComprador: CalificacionesComprador = new CalificacionesComprador(
            calficacionCompradorJson.id,
            calficacionCompradorJson.id_comprador,
            calficacionCompradorJson.id_vendedor,
            calficacionCompradorJson.calificacion,
            calficacionCompradorJson.fecha
          );

          resolve(CalificacionDelComprador);
        }
      );
    });
  }

  public static get(): any {

    return new Promise((resolve, reject) => {
      connection.query(
        `select * from calificaciones_compradores ${this.query}`,
        function (error, results) {

          let calificaciones_compradores: Set<CalificacionesComprador> = new Set<CalificacionesComprador>();

          results.forEach(calificacionCompradorJson => {
            var calificacionComprador: CalificacionesComprador = new CalificacionesComprador(
              calificacionCompradorJson.id,
              calificacionCompradorJson.id_vendedor,
              calificacionCompradorJson.id_comprador,
              calificacionCompradorJson.calificacion,
              calificacionCompradorJson.fecha
            );
            calificaciones_compradores.add(calificacionComprador);
          });


          resolve(calificaciones_compradores);
        }
      );
    });
  }
  public async save(): Promise<void> {
    await connection.query(
      `DELETE FROM calificaciones_comprador where id = ${this.id}`
    );
    connection.query(
      `insert into calificaciones_comprador values(${this.id},${this.id_comprador},${this.id_vendedor},${this.calificacion},${fechaMYSQL(this.fecha)}) ON DUPLICATE KEY UPDATE id_comprador = ${this.id_comprador}, id_vendedor = ${this.id_vendedor}, calificacion = "${this.calificacion}", fecha = '${fechaMYSQL(this.fecha)}'`
    );
  }
}

