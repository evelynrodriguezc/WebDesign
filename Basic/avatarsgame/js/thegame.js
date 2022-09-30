const sectionSelectAttack = document.getElementById('selector-attack')
const sectionRestart = document.getElementById('restart')
const buttonAvatarPlayer = document.getElementById('start-button')
const buttonRestart = document.getElementById('restart-button')
sectionRestart.style.display = 'none'

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

let playerID = null 
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


let canvas = map.getContext("2d")
let interval
let mapBackground = new Image()
mapBackground.src = './assets/map1.png'
let expectedHeight 
let widthMap = window.innerWidth - 20
const widthMaxMap = 500

if(widthMap > widthMaxMap){
    widthMap = widthMaxMap - 20
}

expectedHeight = widthMap * 600 / 800

map.width = widthMap
map.height = expectedHeight

class Avatar {
    constructor(name, image, lives, imgMap) {
        this.name = name
        this.image = image
        this.lives = lives
        this.attacks = []
        this.width = 80
        this.height = 80
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapImage = new Image()
        this.mapImage.src = imgMap
        this.speedX = 0
        this.speedY = 0
    }

    drawAvatar(){
        canvas.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let aang = new Avatar('Aang', './assets/aang', 5, './assets/aang')

let kiyoshi = new Avatar('Kiyoshi', './assets/kiyoshi', 5, './assets/kiyoshi')

let korra = new Avatar('Korra', './assets/korra', 5, './assets/korra')

let roku = new Avatar('Roku', './assets/roku', 5, './assets/roku')

let aangEnemy = new Avatar('Aang', './assets/aang', 5, './assets/aang')

let kiyoshiEnemy = new Avatar('Kiyoshi', './assets/kiyoshi', 5, './assets/kiyoshi')

let korraEnemy = new Avatar('Korra', './assets/korra', 5, './assets/korra')

let rokuEnemy = new Avatar('Roku', './assets/roku', 5, './assets/roku')


aang.attacks.push(
    { name: '🌬', id: 'button-air' },
    { name: '🌬', id: 'button-air' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
    { name: '🪨', id: 'button-earth' },
)

aangEnemy.attacks.push(
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

kiyoshiEnemy.attacks.push(
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

korraEnemy.attacks.push(
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

rokuEnemy.attacks.push(
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
            <p class="pname-avatars">${avatar.name}</p>
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

    joinGame()
}

function joinGame(){
    fetch("http://localhost:8080/join")
        .then(function (res) {
            if(res.ok){
                res.text()
                    .then(function (response) {
                        console.log(response)
                        playerID = response
            })
        }
    })
}

function  selectAvatarPlayer() {
    
    sectionSelectAvatar.style.display = 'none'
    
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

    selectCharacter(avatarPlayer)

    extractAttacks(avatarPlayer)
    sectionViewMap.style.display = 'flex'
    startMap()
}

function selectCharacter(avatarPlayer) {
    fetch(`http://localhost:8080/avatar/${playerID}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: avatarPlayer
        })
    })
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

function selectAvatarEnemy(enemy) {
    //let randomAvatar = random(0, avatars.length -1)

    //spanAvatarEnemy.innerHTML = avatars[randomAvatar].name
    spanAvatarEnemy.innerHTML = enemy.name
    attacksAvatarEnemy = enemy.attacks
    sequenceAttack()
}

function attackEnemyRand() {
    console.log('Enemy attack', attacksAvatarEnemy)
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
        createFinalMessage("Congrats 🎉, You win")
    } else {
        createFinalMessage("Sorry, You lose 😣")
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
    avatarPlayerObject.drawAvatar()
    
    sendPosition(avatarPlayerObject.x, avatarPlayerObject.y)

    aangEnemy.drawAvatar()
    kiyoshiEnemy.drawAvatar()
    korraEnemy.drawAvatar()
    rokuEnemy.drawAvatar()

    if(avatarPlayerObject.speedX !== 0 || avatarPlayerObject.speedY !== 0){
        reviewCollision(aangEnemy)
        reviewCollision(kiyoshiEnemy)
        reviewCollision(korraEnemy)
        reviewCollision(rokuEnemy)
    }
}

function sendPosition(x, y){
    fetch(`http://localhost:8080/avatar/${playerID}/position`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
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

function reviewCollision(enemy){
    const upEnemy = 
        enemy.y
    const downEnemy = 
        enemy.y + enemy.height
    const rightEnemy = 
        enemy.x + enemy.width
    const leftEnemy = 
        enemy.x

    const upAvatar = 
        avatarPlayerObject.y
    const downAvatar = 
        avatarPlayerObject.y + avatarPlayerObject.height
    const rightAvatar = 
        avatarPlayerObject.x + avatarPlayerObject.width
    const leftAvatar = 
        avatarPlayerObject.x

    if(
        downAvatar < upEnemy || 
        upAvatar > downEnemy ||
        rightAvatar < leftEnemy ||
        leftAvatar > rightEnemy
    ){
        return;
    } 
    stopMovement()
    clearInterval(interval)
    console.log('There is a collision');
    sectionSelectAttack.style.display = 'flex'
    sectionViewMap.style.display = 'none'
    selectAvatarEnemy(enemy)
}

window.addEventListener('load', startGame)
