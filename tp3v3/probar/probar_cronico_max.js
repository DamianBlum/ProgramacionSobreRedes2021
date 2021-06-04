let start = Date.now();
let arrayButacas=['"a3"','"b1"','"b2"','"b3"','"b4"','"c2"','"c3"','"c4"','"d1"','"d2"','"d3"','"f1"'];

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

async function hola(){
    for (let i = 1; i <= 6; i++) {
        for (let j = 0; j < arrayButacas.length; j++) {
            const butaca = arrayButacas[j];
            request.open("POST", "http://localhost:3305/4/reservar", false);
            request.send({user_id: i, butacas: `[${butaca}]`})
        }
    }
    let end = Date.now();
    console.log(end - start);
}
var formData = new FormData();
formData.append("user_id", 1);
formData.append("butacas", `["a3"]`);

request.open("POST", "http://localhost:3305/4/reservar", false);
//hola();