
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function choice(move) {
    let result = ""
    if (move == 1) {
        result = "Rock 🪨"
    } else if (move == 2) {
        result = "Paper 📃"
    } else if (move == 3) {
        result = "Scissors ✂️"
    } else {
        result = "Incorrect option"
    }
    return result
}
// 1 = rock 2 = paper 3 = sicssors
let player = 0
let min = 1
let max = 3
let pc = 0

let wins = 0
let losses = 0

while (wins < 3 && losses < 3) {
    pc = random(1, 3)
    player = prompt("Choose: 1 = rock, 2 = paper, 3 = scissors")

    alert("You chose: " + choice(player))
    alert("PC chose: " + choice(pc))

    //combat
    if (pc == player) {
        alert("TIE")
    } else if ((player == 1 && pc == 3) || (player == 2 && pc == 1) || (player == 3 && pc == 2)) {
        alert("You are the winner")
        wins = wins + 1
    } else {
        alert("PC is the winner")
        losses = losses + 1
    }
}
alert("You won: " + wins + " times. You loss: " + losses + " times.")