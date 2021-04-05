var n = 0;
var miPromesa = new Promise(function (resolve, reject) { setTimeout(function () { n = 10; }, 500); });
miPromesa.then(function () { console.log(n); });
