const sectionSelectAttack = document.getElementById('selector-attack')
const sectionRestart = document.getElementById('restart')
const buttonAvatarPlayer = document.getElementById('start-button')
const buttonRestart = document.getElementById('restart-button')

const sectionSelectAvatar = document.getElementById('select-avatar')
const spanAvatarPlayer = document.getElementById('avatar-player')

const spanAvatarEnemy = document.getElementById('avatar-enemy')

const spanLivesPlayer = document.getElementById('lives-player')
const spanLivesEnemy = document.getElementById('lives-enemy')

const sectionMessages = document.getElementById('result')
const attacksByPlayer = document.getElementById('attacks-player')
const attacksByEnemy = document.getElementById('attacks-enemy')
const containerCards = document.getElementById('containerCards')
const containerAttacks = document.getElementById('containerAttacks')

const sectionViewMap = document.getElementById('view-map')
const map = document.getElementById('map')

let avatars = []
let attackByPlayer = []
let attackByEnemy = []
let optionsAvatars
let inputAang
let inputKiyoshi
let inputKorra
let inputRoku
let avatarPlayer
let avatarPlayerObject
let attacksAvatar
let attacksAvatarEnemy
let buttonFire
let buttonWater
let buttonEarth
let buttonAir
let buttons = []
let indexAttackPlayer
let indexAttackEnemy
let winsPlayer = 0
let winsEnemy = 0
let livesPlayer = 3
let livesEnemy = 3

let canvas = map.getContext("2d")
let interval
let mapBackground = new Image()
mapBackground.src = './assets/map1.png'

class Avatar {
    constructor(name, image, lives) {
        this.name = name
        this.image = image
        this.lives = lives
        this.attacks = []
        this.x = 20
        this.y = 30
        this.width = 100
        this.height = 150
        this.mapImage = new Image()
        this.mapImage.src = image
        this.speedX = 0
        this.speedY = 0
    }
}

let aang = new Avatar('Aang', './assets/aang', 5)

let kiyoshi = new Avatar('Kiyoshi', './assets/kiyoshi', 5)

let korra = new Avatar('Korra', './assets/korra', 5)

let roku = new Avatar('Roku', './assets/roku', 5)

aang.attacks.push(
    { name: '🌬', id: 'button-air' },
    { name: '🌬', id: 'button-air' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
    { name: '🪨', id: 'button-earth' },
)

kiyoshi.attacks.push(
    { name: '🪨', id: 'button-earth' },
    { name: '🪨', id: 'button-earth' },
    { name: '🌬', id: 'button-air' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    
)

korra.attacks.push(
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    { name: '🪨', id: 'button-earth' },
    { name: '🌬', id: 'button-air' },
)

roku.attacks.push(
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🪨', id: 'button-earth' },
    { name: '💧', id: 'button-water' },
    { name: '🌬', id: 'button-air' },
)

avatars.push(aang, kiyoshi, korra, roku)

function startGame() {
    
    sectionSelectAttack.style.display = 'none'
    sectionViewMap.style.display = 'none'

    avatars.forEach((avatar) => {
        optionsAvatars = `
        <input type="radio" name="avatar" id=${avatar.name} />
        <label class="cards-avatars" for=${avatar.name}>
            <p>${avatar.name}</p>
            <img src=${avatar.image} alt=${avatar.name}>
        </label>
        `
    containerCards.innerHTML += optionsAvatars

     inputAang = document.getElementById('Aang')
     inputKiyoshi = document.getElementById('Kiyoshi')
     inputKorra = document.getElementById('Korra')
     inputRoku = document.getElementById('Roku')

    })
    
    buttonAvatarPlayer.addEventListener('click',  selectAvatarPlayer)
    
    buttonRestart.addEventListener('click', restartGame)
}

function  selectAvatarPlayer() {
    
    sectionSelectAvatar.style.display = 'none'
    
    //sectionSelectAttack.style.display = 'flex'
    
    
    if (inputAang.checked) {
        spanAvatarPlayer.innerHTML = inputAang.id
        avatarPlayer = inputAang.id
    } else if (inputKiyoshi.checked) {
        spanAvatarPlayer.innerHTML = inputKiyoshi.id
        avatarPlayer = inputKiyoshi.id
    } else if (inputKorra.checked) {
        spanAvatarPlayer.innerHTML = inputKorra.id
        avatarPlayer = inputKorra.id
    } else if (inputRoku.checked) {
        spanAvatarPlayer.innerHTML = inputRoku.id
        avatarPlayer = inputRoku.id
    } 
    else {
        alert('Choose your avatar')
    }

    extractAttacks(avatarPlayer)
    sectionViewMap.style.display = 'flex'
    startMap()
    selectAvatarEnemy()
}

function extractAttacks(avatarPlayer) {
    let attacks
    for (let i = 0; i < avatars.length; i++) {
        if (avatarPlayer === avatars[i].name) {
            attacks = avatars[i].attacks
        }
        
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        attacksAvatar = `
        <button id=${attack.id} class="button-attack BAttack">${attack.name}</button>
        `
        containerAttacks.innerHTML += attacksAvatar
    })

     buttonFire = document.getElementById('button-fire')
     buttonWater = document.getElementById('button-water')
     buttonEarth = document.getElementById('button-earth')
     buttonAir = document.getElementById('button-air')
     buttons = document.querySelectorAll('.BAttack')
     
}

function sequenceAttack(){
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                attackByPlayer.push('FIRE')
                console.log(attackByPlayer)
                button.style.background = '#112F58'
                button.disabled = true
            }else if(e.target.textContent === '💧'){
                attackByPlayer.push('WATER')
                console.log(attackByPlayer)
                button.style.background = '#112F58'
                button.disabled = true
            }else if(e.target.textContent === '🪨'){
                attackByPlayer.push('EARTH')
                console.log(attackByPlayer)
                button.style.background = '#112F58'
                button.disabled = true
            }else {
                attackByPlayer.push('AIR')
                console.log(attackByPlayer)
                button.style.background = '#112F58'
                button.disabled = true
            }
            attackEnemyRand()  
        })
    })
}

function selectAvatarEnemy() {
    let randomAvatar = random(0, avatars.length -1)

    spanAvatarEnemy.innerHTML = avatars[randomAvatar].name
    attacksAvatarEnemy = avatars[randomAvatar].attacks
    sequenceAttack()
}

function attackEnemyRand() {
    let attackRandom = random(0, attacksAvatarEnemy.length - 1)
    
    if (attackRandom == 0 || attackRandom == 1) {
        attackByEnemy.push('FIRE')
    } else if (attackRandom == 2 || attackRandom == 3) {
        attackByEnemy.push('WATER')
    } else if (attackRandom == 4 || attackRandom == 5) {
        attackByEnemy.push('EARTH')
    } else {
        attackByEnemy.push('AIR')
    }
    console.log(attackByEnemy)
    startCombat()
}

function startCombat(){
    if(attackByPlayer.length === 5){
        combat()
    }
}

function indexBothPlayers(player, enemy){
    indexAttackPlayer = attackByPlayer[player]
    indexAttackEnemy = attackByEnemy[enemy]
}

function combat() {
    
    for(let index = 0; index < attackByPlayer.length; index++){
        if(attackByPlayer[index] === attackByEnemy[index]){
            indexBothPlayers(index, index)
            createMessage("TIE")
        } else if(attackByPlayer[index] === 'FIRE' && attackByEnemy[index] === 'EARTH'){
            indexBothPlayers(index, index)
            createMessage("You win")
            winsPlayer++
            spanLivesPlayer.innerHTML = winsPlayer
        } else if(attackByPlayer[index] === 'WATER' && attackByEnemy[index] === 'FIRE'){
            indexBothPlayers(index, index)
            createMessage("You win")
            winsPlayer++
            spanLivesPlayer.innerHTML = winsPlayer
        } else if (attackByPlayer[index] == 'AIR' && attackByEnemy[index] == 'WATER'){
            indexBothPlayers(index, index)
            createMessage("You win")
            winsPlayer++
            spanLivesPlayer.innerHTML = winsPlayer
        } else {
            indexBothPlayers(index, index)
            createMessage("You lose")
            winsEnemy++
            spanLivesEnemy.innerHTML = winsEnemy
        }
    }
    checkLives()
}

function checkLives() {
    if (winsPlayer === winsEnemy) {
        createFinalMessage("It is a TIE!")
    } else if (winsPlayer > winsEnemy) {
        createFinalMessage("Congrats, You win c:")
    } else {
        createFinalMessage("Sorry, You lose :c")
    }
}

function createMessage(result) {
    
    
    let newAttackByPlayer = document.createElement('p')
    let newAttackByEnemy = document.createElement('p')

    sectionMessages.innerHTML = result
    newAttackByPlayer.innerHTML = indexAttackPlayer
    newAttackByEnemy.innerHTML = indexAttackEnemy

    attacksByPlayer.appendChild(newAttackByPlayer)
    attacksByEnemy.appendChild(newAttackByEnemy)
}

function createFinalMessage(finalResult) {
    
    
    sectionMessages.innerHTML = finalResult

    sectionRestart.style.display = 'block'
}

function restartGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCanvas(){

    avatarPlayerObject.x = avatarPlayerObject.x + avatarPlayerObject.speedX
    avatarPlayerObject.y = avatarPlayerObject.y + avatarPlayerObject.speedY
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    canvas.drawImage(
        avatarPlayerObject.mapImage,
        avatarPlayerObject.x,
        avatarPlayerObject.y,
        avatarPlayerObject.width,
        avatarPlayerObject.height
    )
}

function moveUP(){
    const avatarPlayerObject = obtainObjectAvatar()
    avatarPlayerObject.speedY = -5
}

function moveDOWN(){
    const avatarPlayerObject = obtainObjectAvatar()
    avatarPlayerObject.speedY = 5
}

function moveR(){
    const avatarPlayerObject = obtainObjectAvatar()
    avatarPlayerObject.speedX = 5
}

function moveL(){
    const avatarPlayerObject = obtainObjectAvatar()
    avatarPlayerObject.speedX = -5
}

function stopMovement(){
    avatarPlayerObject.speedX = 0
    avatarPlayerObject.speedY = 0
}

function keyPressed(event){
    switch(event.key){
        case 'ArrowUp':
            moveUP()
            break
        case 'ArrowDown':
            moveDOWN()
            break
        case 'ArrowLeft':
            moveL()
            break
        case 'ArrowRight':
            moveR()
            break
        
        default:
            break
    }
}

function startMap(){
    map.width = 480
    map.height = 380

    avatarPlayerObject = obtainObjectAvatar(avatarPlayer)

    console.log(avatarPlayerObject, avatarPlayer);

    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMovement)
}

function obtainObjectAvatar(){
    for (let i = 0; i < avatars.length; i++) {
        if (avatarPlayer === avatars[i].name) {
            return avatars[i]
        }
    }
}

window.addEventListener('load', startGame)
