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

let avatars = []
let attackByPlayer
let attackByEnemy
let optionsAvatars
let inputAang
let inputKiyoshi
let inputKorra
let inputRoku
let avatarEnemy
let attacksAvatar
let buttonFire
let buttonWater
let buttonEarth
let buttonAir
let buttons = []
let livesPlayer = 5
let livesEnemy = 5

class Avatar {
    constructor(name, image, lives) {
        this.name = name
        this.image = image
        this.lives = lives
        this.attacks = []
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
    
    
    sectionSelectAttack.style.display = 'flex'
    
    
    
    if (inputAang.checked) {
        spanAvatarPlayer.innerHTML = inputAang.id
        avatarEnemy = inputAang.id
    } else if (inputKiyoshi.checked) {
        spanAvatarPlayer.innerHTML = inputKiyoshi.id
        avatarEnemy = inputKiyoshi.id
    } else if (inputKorra.checked) {
        spanAvatarPlayer.innerHTML = inputKorra.id
        avatarEnemy = inputKorra.id
    } else if (inputRoku.checked) {
        spanAvatarPlayer.innerHTML = inputRoku.id
        avatarEnemy = inputRoku.id
    } 
    else {
        alert('Choose your avatar')
    }

    extractAttacks(avatarEnemy)
    selectAvatarEnemy()
}

function extractAttacks(avatarEnemy) {
    let attacks
    for (let i = 0; i < avatars.length; i++) {
        if (avatarEnemy === avatars[i].name) {
            attacks = avatars[i].attacks
        }
        
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        attacksAvatar = `
        <button id=${attack.id} class="button-attack Battack">${attack.name}</button>
        `
        containerAttacks.innerHTML += attacksAvatar
    })

     buttonFire = document.getElementById('button-fire')
     buttonWater = document.getElementById('button-water')
     buttonEarth = document.getElementById('button-earth')
     buttonAir = document.getElementById('button-air')
     buttons = document.querySelectorAll('.Battack')


     buttonFire.addEventListener('click', attackFire)
    
     buttonWater.addEventListener('click', attackWater)
     
     buttonEarth.addEventListener('click', attackEarth)

     buttonAir.addEventListener('click', attackAir)
}

/* function sequenceAttack(){

} */

function selectAvatarEnemy() {
    let randomAvatar = random(0, avatars.length -1)

    spanAvatarEnemy.innerHTML = avatars[randomAvatar].name
}

function attackFire() {
    attackByPlayer = 'FIRE'
    attackEnemyRand()
}
function attackWater() {
    attackByPlayer = 'WATER'
    attackEnemyRand()
}
function attackEarth() {
    attackByPlayer = 'EARTH'
    attackEnemyRand()
}

function attackAir() {
    attackByPlayer = 'AIR'
    attackEnemyRand()
}

function attackEnemyRand() {
    let attackRandom = random(1,4)
    
    if (attackRandom == 1) {
        attackByEnemy = 'FIRE'
    } else if (attackRandom == 2) {
        attackByEnemy = 'WATER'
    } else if (attackRandom == 3) {
        attackByEnemy = 'EARTH'
    } else {
        attackByEnemy = 'AIR'
    }

    combat()
}

function combat() {
    
    
    if(attackByEnemy == attackByPlayer) {
        createMessage("TIE")
    } else if(attackByPlayer == 'FIRE' && attackByEnemy == 'EARTH') {
        createMessage("You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else if(attackByPlayer == 'WATER' && attackByEnemy == 'FIRE') {
        createMessage("You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else if(attackByPlayer == 'EARTH' && attackByEnemy == 'WATER') {
        createMessage("You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else if(attackByPlayer == 'WATER' && attackByEnemy == 'FIRE') {
        createMessage("You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else if(attackByPlayer == 'AIR' && attackByEnemy == 'WATER') {
        createMessage("You win")
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else {
        createMessage("You lose")
        livesPlayer--
        spanLivesPlayer.innerHTML = livesPlayer
    }

    checkLives()
}

function checkLives() {
    if (livesEnemy == 0) {
        createFinalMessage("Congrats! You win :)")
    } else if (livesPlayer == 0) {
        createFinalMessage('Sorry, You lose :(')
    }
}

function createMessage(result) {
    
    
    let newAttackByPlayer = document.createElement('p')
    let newAttackByEnemy = document.createElement('p')

    sectionMessages.innerHTML = result
    newAttackByPlayer.innerHTML = attackByPlayer
    newAttackByEnemy.innerHTML = attackByEnemy

    attacksByPlayer.appendChild(newAttackByPlayer)
    attacksByEnemy.appendChild(newAttackByEnemy)
}

function createFinalMessage(finalResult) {
    
    
    sectionMessages.innerHTML = finalResult

    
    buttonFire.disabled = true
    
    buttonWater.disabled = true
    
    buttonEarth.disabled = true

    buttonAir.disabled = true
    
    sectionRestart.style.display = 'block'
}

function restartGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)
