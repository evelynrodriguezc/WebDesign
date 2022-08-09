
const buttonCharacterPlayer = document.getElementById('button-character')
const sectionSelectAttack = document.getElementById('attack-picker')
const sectionResetGame = document.getElementById('reset')
const buttonReset = document.getElementById('button-reset')
sectionResetGame.style.display = 'none'

const sectionSelectCharacter = document.getElementById('character-picker')
const spanPlayerCharacter = document.getElementById('character-player')

const spanEnemyCharacter = document.getElementById('character-enemy')

const spanLivesPlayer = document.getElementById('lives-player')
const spanLivesEnemy = document.getElementById('lives-enemy')

const sectionMessage = document.getElementById('result')
const playersAttack = document.getElementById('attacks-player')
const enemysAttack= document.getElementById('attacks-enemy')

const sectionReset = document.getElementById('reset')

const cardsContainer = document.getElementById('cardsContainer')
const attacksContainer = document.getElementById('attacksContainer')

let avatars = []
let attackPlayer 
let attackEnemy
let avatarsOptions
let inputAang 
let inputKiyoshi 
let inputKorra 
let inputRoku 
let characterPlayer
let attacksAvatar
let buttonWater 
let buttonFire
let buttonEarth 
let buttonAir 
let livesPlayer = 3
let livesEnemy = 3

class Avatar {
    constructor(name, img, live){
        this.name = name
        this.img = img
        this.live = live
        this.attacks = []
    }
}


let aang = new Avatar('Aang', './assets/aang', 5)

let kiyoshi = new Avatar('Kiyoshi', './assets/kiyoshi', 5)

let korra = new Avatar('Korra', './assets/korra', 5)

let roku = new Avatar('Roku', './assets/roku', 5)


aang.attacks.push(
    {name: '🌬', id: 'button-earth'},
    {name: '🌬', id: 'button-air'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'},
    {name: '🪨', id: 'button-earth'},
)

kiyoshi.attacks.push(
    {name: '🪨', id: 'button-earth'},
    {name: '🪨', id: 'button-earth'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'},
    {name: '🌬', id: 'button-air'}
)

korra.attacks.push(
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'},
    {name: '🪨', id: 'button-earth'},
    {name: '🌬', id: 'button-air'}
)

roku.attacks.push(
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '💧', id: 'button-water'},
    {name: '🪨', id: 'button-earth'},
    {name: '🌬', id: 'button-air'}
)

avatars.push(aang, kiyoshi, korra, roku)


function startGame(){

    sectionSelectAttack.style.display = 'none'

    avatars.forEach((avatar) => {
        avatarsOptions = `
        <input type="radio" name="character" id=${avatar.name} />
        <label class="avatars-card" for=${avatar.name}>
            <p>${avatar.name}</p>
            <img src=${avatar.img} alt=${avatar.name}>
        </label>
        `
        cardsContainer.innerHTML += avatarsOptions
    
        inputAang = document.getElementById('Aang')
        inputKiyoshi = document.getElementById('Kiyoshi')
        inputKorra = document.getElementById('Korra')
        inputRoku = document.getElementById('Roku')
    
    })

    buttonCharacterPlayer.addEventListener('click', selectPlayerCharacter)

    buttonReset.addEventListener('click', resetGame)
}

function selectPlayerCharacter(){
    
    sectionSelectCharacter.style.display = 'none'

    sectionSelectAttack.style.display = 'flex'

    if(inputAang.checked){
        spanPlayerCharacter.innerHTML = inputAang.id
        characterPlayer = inputAang.id
    } else if(inputKiyoshi.checked){
        spanPlayerCharacter.innerHTML = inputKiyoshi.id
        characterPlayer = inputKiyoshi.id
    } else if(inputKorra.checked){
        spanPlayerCharacter.innerHTML = inputKorra.id
        characterPlayer = inputKorra.id
    } else if(inputRoku.checked){
        spanPlayerCharacter.innerHTML = inputRoku.id
        characterPlayer = inputRoku.id 
    } else {
        alert("You haven't selected your character")
        resetGame()
    }
    extractAttacks(characterPlayer)
    selectEnemyCharacter()

}


function extractAttacks(characterPlayer) {
    let attacks
    for(let i = 0; i < avatars.length; i++){
        if(characterPlayer === avatars[i].nombre) {
            attacks = avatars[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    
    attacks.forEach((attack) => {
        attacksAvatar = `
        <button id=${attack.id} class="attack-button" > ${attack.name} </button>
        `
        attacksContainer.innerHTML += attacksAvatar
    })
        buttonWater = document.getElementById('button-water')
        buttonFire = document.getElementById('button-fire')
        buttonEarth = document.getElementById('button-earth')
        buttonAir = document.getElementById('button-air')

  
        buttonWater.addEventListener('click', attackWater)
        buttonFire.addEventListener('click', attackFire)
        buttonEarth.addEventListener('click', attackEarth)    
        buttonAir.addEventListener('click', attackAir)
}

function selectEnemyCharacter(){
    let randomCharacter = random(0, avatars.length - 1)

    spanEnemyCharacter.innerHTML = avatars[randomCharacter].name
}


//attacks by elements

function attackWater(){
    attackPlayer = 'WATER 💧'
    attackEnemyRand()
}

function attackFire(){
    attackPlayer = 'FIRE 🔥'
    attackEnemyRand()
}

function attackEarth(){
    attackPlayer = 'EARTH 🪨'
    attackEnemyRand()
}

function attackAir(){
    attackPlayer = 'AIR 🌬'
    attackEnemyRand()
}

//

function attackEnemyRand(){
    let randomAttack = random(1, 4)

    if(randomAttack == 1){
        attackEnemy = 'WATER 💧'
    } else if (randomAttack == 2){
        attackEnemy = 'FIRE 🔥'
    } else if (randomAttack == 3){
        attackEnemy = 'EARTH 🪨'
    } else {
        attackEnemy = 'AIR 🌬'
    }   
    
    combat()
}


function createMessage(result){

    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')
    
    sectionMessage.innerHTML = result
    newPlayerAttack.innerHTML = attackPlayer
    newEnemyAttack.innerHTML = attackEnemy
    
    playersAttack.appendChild(newPlayerAttack)
    enemysAttack.appendChild(newEnemyAttack)
}

function createFinalMessage(finalResult){
    
    sectionMessage.innerHTML = finalResult
 
    buttonWater.disabled = true

    buttonFire.disabled = true

    buttonEarth.disabled = true

    buttonAir.disabled = true

    sectionReset.style.display = 'block'
}

function combat(){

    if(attackEnemy == attackPlayer){
        createMessage(" TIE")
    } else if((attackPlayer == 'FIRE' && attackEnemy == 'EARTH') || (attackPlayer == 'WATER' && attackEnemy == 'FIRE') || (attackPlayer == 'EARTH' && attackEnemy == 'WATER') || (attackPlayer == 'AIR' && attackEnemy == 'EARTH')){
        createMessage(" You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else {
        createMessage(' Your enemy wins')
        livesPlayer--
        spanLivesPlayer.innerHTML = livesPlayer
    }

    checkLives()
}

    
function checkLives(){
    if(livesEnemy == 0){
        createFinalMessage("Your avatar won this battle 😃")
    } else if(livesPlayer == 0){
        createFinalMessage("Game Over 😞")
    }
    /* let buttonResetGame = document.getElementById('button-reset')
    buttonResetGame.disabled = false */

}


function resetGame(){
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

window.addEventListener('load', startGame)