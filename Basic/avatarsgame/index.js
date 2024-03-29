
const express = require("express")
const cors = require("cors")
const { application } = require("express")

const app = express()
const port = 8080

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id){
        this.id = id
    }

    assignAvatar(avatar){
        this.avatar = avatar
    }

    updatePosition(x, y){
        this.x = x
        this.y = y
    }

    assignAttacks(attacks){
        this.attacks = attacks
    }
}

class Avatar {
    constructor(name){
        this.name = name
    }
}


app.get("/join", (req, res) => {
    const id = `${Math.random()}` //id random number
    const player = new Player(id) 

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/avatar/:playerID", (req, res) => {
    const playerID = req.params.playerID || ""
    const name = req.body.avatar || ""
    const avatar = new Avatar(name)

    const playerIndex = players.findIndex((player) => playerID === player.id)
    
    if(playerIndex >= 0){
        players[playerIndex].assignAvatar(avatar)
    }

    console.log(players)
    console.log(playerID)
    res.end()
})

app.post("/avatar/:playerID/position", (req, res) => {
    const playerID = req.params.playerID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerID === player.id)
    
    if(playerIndex >= 0){
        players[playerIndex].updatePosition(x, y)
    }

    const enemies = players.filter((player) => playerID !== player.id)

    res.send({
        enemies
    })
})

app.post("/avatar/:playerID/attacks", (req, res) => {
    const playerID = req.params.playerID || ""
    const attacks = req.body.attacks || []

    const playerIndex = players.findIndex((player) => playerID === player.id)
    
    if(playerIndex >= 0){
        players[playerIndex].assignAttacks(attacks)
    }
    res.end()
})

app.get("/avatar/:playerID/attacks", (req, res) => {
    const playerID = req.params.playerID || ""
    const player = players.find((player) => player.id === playerID)
    res.send({
        attacks: player.attacks || []
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
