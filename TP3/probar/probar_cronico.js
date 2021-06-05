const axios = require('axios').default;
let promesas = [];
let start = Date.now();
let arrayButacas=['"a3"','"b1"','"b2"','"b3"','"b4"','"c2"'];

async function hola(){
    for (let i = 1; i <= 6; i++) {
        for (let j = 0; j < arrayButacas.length; j++) {
            const butaca = arrayButacas[j];
            await promesas.push(
                await axios.post('http://localhost:3305/4/reservar', {user_id: i, butacas: `[${butaca}]`}).then(res => {console.log(i + " " + res.data)})
            );
        }
    }
    let end = Date.now();
    console.log(end - start);

}

hola();

/*Promise.all(promesas).then(res => {

});*/



//hacer como un for recorriendo las dos api midiendo tiempo de no se que