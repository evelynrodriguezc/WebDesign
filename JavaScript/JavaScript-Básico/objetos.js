// Funcion constructora

function auto(marca, modelo, annio) {
    this.marca = marca;
    this.modelo = modelo;
    this.annio = annio;    
}

var autos = []
for(let i = 0; i < 3; i++)
{
    var marca = prompt("Ingresa la marca del auto: ");
    var modelo = prompt("Ingresa el modelo del auto: ");
    var annio = prompt("Ingresa la fecha de fabricación del auto: ");
    autos.push(new auto (marca, modelo, annio));
} 

for (let i = 0; i < autos.length; i++)
{
    console.log(autos[i]);
}