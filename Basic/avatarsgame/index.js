

const express = require("express")
const cors = require("cors")
const { application } = require("express")

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id){
        this.id = id
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
     console.log(players)
     console.log(playerID)
     res.end()
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
