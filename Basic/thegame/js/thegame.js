
let attackPlayer 
let attackEnemy
let livesPlayer = 3
let livesEnemy = 3

function startGame(){

    let sectionSelectAttack = document.getElementById('attack-picker')
    sectionSelectAttack.style.display = 'none'

    let buttonCharacterPlayer = document.getElementById('button-character')
    buttonCharacterPlayer.addEventListener('click', selectPlayerCharacter)

    let buttonResetGame = document.getElementById('button-reset')
    buttonResetGame.addEventListener('click', resetGame)
    buttonResetGame.disabled = true
//-------------------
    let buttonWater = document.getElementById('button-water')
    buttonWater.addEventListener('click', attackWater)

    let buttonFire = document.getElementById('button-fire')
    buttonFire.addEventListener('click', attackFire)

    let buttonEarth = document.getElementById('button-earth')
    buttonEarth.addEventListener('click', attackEarth)

    let buttonAir = document.getElementById('button-air')
    buttonAir.addEventListener('click', attackAir)


}

function selectPlayerCharacter(){
    
    let sectionSelectCharacter = document.getElementById('character-picker')
    sectionSelectCharacter.style.display = 'none'

    let sectionSelectAttack = document.getElementById('attack-picker')
    sectionSelectAttack.style.display = 'block'

    let inputAang = document.getElementById('Aang')
    let inputKiyoshi = document.getElementById('Kiyoshi')
    let inputKorra= document.getElementById('Korra')
    let inputRoku= document.getElementById('Roku')
    let spanPlayerCharacter = document.getElementById('character-player')
    //let spanEnemyCharacter = document.getElementByID('character-enemy')


    if(inputAang.checked){
        spanPlayerCharacter.innerHTML = 'Aang'
    } else if(inputKiyoshi.checked){
        spanPlayerCharacter.innerHTML = 'Kiyoshi'
    } else if(inputKorra.checked){
        spanPlayerCharacter.innerHTML = 'Korra'
    } else if(inputRoku.checked){
        spanPlayerCharacter.innerHTML = 'Roku'
    } else {
        alert("You haven't selected your character")
        resetGame()
    }
    selectEnemyCharacter()

    let buttonCharacterPlayer = document.getElementById('character-player')
    buttonCharacterPlayer.disabled = true

}


function selectEnemyCharacter(){


    let randomCharacter = random(1,5)
    let spanEnemyCharacter = document.getElementById('character-enemy')

    if(randomCharacter == 1){
        spanEnemyCharacter.innerHTML = 'Aang' //air
    } else if(randomCharacter == 2){
        spanEnemyCharacter.innerHTML = 'Kiyoshi' //earth
    } else if(randomCharacter == 3){
        spanEnemyCharacter.innerHTML = 'Korra' //water
    } else {
        spanEnemyCharacter.innerHTML = 'Roku' //fire
    }
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
    
    
    let sectionMessage = document.getElementById('messages')

    let paragraph = document.createElement('p')
    
    paragraph.innerHTML = 'You used ' + attackPlayer + ', your enemy used ' + attackEnemy +' .' + result
 
    sectionMessage.appendChild(paragraph)
}

function createFinalMessage(finalResult){
    let sectionMessage = document.getElementById('messages')

    let paragraph = document.createElement('p')
    
    paragraph.innerHTML = finalResult
 
    sectionMessage.appendChild(paragraph)

    let buttonWater = document.getElementById('button-water')
    buttonWater.disabled = true

    let buttonFire = document.getElementById('button-fire')
    buttonFire.disabled = true

    let buttonEarth = document.getElementById('button-earth')
    buttonEarth.disabled = true

    let buttonAir = document.getElementById('button-air')
    buttonAir.disabled = true
}


function combat(){
    let spanLivesPlayer = document.getElementById('lives-player')
    let spanLivesEnemy = document.getElementById('lives-enemy')

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
        createFinalMessage("You win 😃")
    } else if(livesPlayer == 0){
        createFinalMessage("You lose 😞")
    }
    let buttonResetGame = document.getElementById('button-reset')
    buttonResetGame.disabled = false

}

function resetGame(){
    location.reload()
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

window.addEventListener('load', startGame)