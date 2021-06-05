const axios = require("axios").default;

console.log("TEST");
console.log("");
console.log("Reserva: 6 butacas * 6 users * 4 = 144 peticiones");

let promesas = [];
let start = Date.now();
let arrayButacas = ["a3", "b1", "b2", "b3", "b4", "c2"];
for (let k = 0; k < 4; k++) {
  for (let i = 1; i <= 6; i++) {
    for (let j = 0; j < arrayButacas.length; j++) {
      const butaca = arrayButacas[j];
      promesas.push(
        axios.post("http://localhost:3304/4/funciones", {
          user_id: i,
          butacas: `["${butaca}"]`,
        })
        /*
        axios.get("http://localhost:3304/funciones", {
          user_id: i,
          butacas: `["${butaca}"]`,
        })
        */
      );
    }
  }
}

Promise.all(promesas).then((res) => {
  console.log("");
  console.log("API Clusterizada:");
  let end = Date.now();
  console.log("Tiempo de ejecucion: " + (end - start) + "ms");
});

promesas2 = [];
start2 = Date.now();

async function prueba() {
for (let k = 0; k < 4; k++) {
  for (let i = 1; i <= 6; i++) {
    for (let j = 0; j < arrayButacas.length; j++) {
      const butaca = arrayButacas[j];
      await promesas2.push(
        await axios.post("http://localhost:3305/4/reservar", {
          user_id: i,
          butacas: `["${butaca}"]`,
        })
      );
    }}
  }
  let end2 = Date.now();
  console.log("");
  console.log("API NO Clusterizada:");
  console.log("Tiempo de ejecucion: " + (end2 - start2) + "ms");
}
prueba();
