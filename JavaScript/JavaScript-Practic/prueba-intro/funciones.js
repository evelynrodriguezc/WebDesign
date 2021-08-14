const name = "Pepa";
const lastname = "Perez Lopez";
const completeName = name + lastname;
const nickname = "pepape";


//_________________________________

console.log("Mi nombre es " + completeName + ", pero prefiero que me digas " + nickname + ".");


//_________________________________

function presentation (name, lastname, nickname) 
{
	const completeName = name + " " + lastname;
	return "Mi nombre es " + completeName + ", pero prefiero que me digas " + nickname 
}

console.log(presentation("Pepa", "Perez Lopez", "pepape"));
