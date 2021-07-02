const axios = require("axios").default;

console.log("TEST");
console.log("");
console.log("Funciones: 6 users *4 = 24 peticiones");

let promesas = [];
let start = Date.now();
for (let k = 0; k < 4; k++) {
  for (let i = 1; i <= 6; i++) {
      promesas.push(
        axios.get("http://localhost:3304/funciones")
      );
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
      await promesas2.push(
        await axios.get("http://localhost:3305/funciones")
      );
    }
  }
  let end2 = Date.now();
  console.log("");
  console.log("API NO Clusterizada:");
  console.log("Tiempo de ejecucion: " + (end2 - start2) + "ms");
}
prueba();
