const axios = require('axios').default;
let promesas = [];
let start = Date.now();
for (let i = 0; i < 20; i++) {
    promesas.push(
        axios.post('http://localhost:3305/1/reservar', {user_id: i, butacas: `["a1"]`}).then(res => {console.log(i + " " + res.data)})
    );
}

Promise.all(promesas).then(res => {
    let end = Date.now();
    console.log(end - start);
});