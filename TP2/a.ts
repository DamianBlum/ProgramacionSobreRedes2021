var n: number = 0;let miPromesa = new Promise (function(resolve, reject){setTimeout(function(){ n=10; }, 500);});miPromesa.then(function(){console.log(n);});