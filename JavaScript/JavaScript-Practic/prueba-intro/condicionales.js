function tipoDeSuscripcion(suscripcion) {
    if (suscripcion == "Free")
    {
        console.log("Solo puede tomar los cursos gratis");
    } else if (suscripcion == "Basic") 
    {
        console.log("Puedes tomar casi todos los cursos de platzi durante un mes");
    } else if (suscripcion == "Expert") 
    {
	    console.log("Puedes tomar casi todos los cursos durante un año");
    } else if (suscripcion == "ExpertPlus") 
    {
	    console.log("Tú y alguien más pueden tomar TODOS los cursos de Platzi durante un año");
    } else 
    {
        console.log("¿Qué estas esperando para registrarte?");
	}
}

