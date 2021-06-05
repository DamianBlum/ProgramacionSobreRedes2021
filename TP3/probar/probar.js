const axios = require('axios').default;
let promesas = [];
promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

promesas.push(
    axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)});
);

Promise.all(promesas).then(res => {console.log("termine")});