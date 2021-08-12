var piedra = "Piedra";
var papel = "Papel";
var tijera = "Tijera";

var resultado = function(user, cpu) 
{
    if(user != cpu) 
    {
        if(user === piedra && cpu === tijera) 
        {
            console.log("El usuario ganó con " + piedra)
        }else if (user === papel && cpu === piedra) 
        {
            console.log("El usuario ganó con " + papel)
        }else if (user === tijera && cpu === papel) 
        {
            console.log("El usuario ganó con " + tijera)
        }else {
            console.log("Perdiste")
        }
    }else if (user === cpu) 
    {
        console.log("Empate")
    }
};

///
resultado(piedra, tijera)