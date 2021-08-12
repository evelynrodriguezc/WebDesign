var piedra = "Piedra";
var papel = "Papel";
var tijera = "Tijera";

var resultado = function(user, pc) 
{
    if(user != pc) 
    {
        if(user === piedra && pc === tijera) 
        {
            console.log("El usuario ganó con " + piedra)
        }else if (user === papel && pc === piedra) 
        {
            console.log("El usuario ganó con " + papel)
        }else if (user === tijera && pc === papel) 
        {
            console.log("El usuario ganó con " + tijera)
        }else {
            console.log("Perdiste")
        }
    }else if (user === pc) 
    {
        console.log("Empate")
    }
};

///
resultado(piedra, tijera)



var usuario = 2;
var pc = 2;

function juego(usuario, pc)
{
    switch(true)
    {
        case (usuario === pc):
            console.log("Empate");
            break;
        case (usuario === 2 && pc === 1):
            console.log("Ganaste");
            break;
        case (usuario === 0 && pc === 2):
            console.log("Ganaste");
            break;
        case (usuario === 1 && pc === 0):
            console.log("Ganaste");
            break;
        default: 
            console.log("Perdiste");
    }
}