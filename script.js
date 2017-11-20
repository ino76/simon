// Simon game
// author: Daniel Cech 2017


const startButton = document.getElementById('start')
const result = document.getElementById('result')
const colors = ["hsl(6, 70%, 30%)", "hsl(110, 70%, 30%)", "hsl(205, 70%, 20%)", "hsl(55, 90%, 30%)"]
const buttons = document.querySelectorAll('.simBut')
const wrongSound = document.getElementById('wrong')
const wrongSound2 = document.getElementById('wrong2')
setColors()
setListeners()


let interval
let position = 0
let points = 0
let games = 1
let sequence = []

// indicates if we are in game 
let inGame = false

// indicates if computer showing the sequence in this moment
let active = false

// if last one is set to 'true', game won't play whole sequence but
// only last one tone 
let lastOne = false
let lastOneCheckbox = document.getElementById('lastOne')

// this function is started after player click on 'start' button
// it basically sets and starts new game
function setNew() {
    result.textContent = ""
    startBle(true)
    start()
}


function startBle(value) {
    startButton.disabled = value
    inGame = value
}


function start() {
    addNext()
    playSequence()
}


// set colors at window.load
function setColors() {
    for (i = 0; i < 4; i++) {
        buttons[i].style.backgroundColor = colors[i];
    }
}


function setListeners() {
    buttons.forEach(b => b.addEventListener('touchend', push))
}


function listen(pushedButton) {

    let sequenceLength = sequence.length
    console.log("ma zmacknout: " + sequence[position] + ", zmackl: " + pushedButton)

    if (sequence[position] === pushedButton) {
        position++
        playSound(pushedButton)
        lightUp(pushedButton)
        
        if (position === sequenceLength) {
            position = 0
            points++
            setTimeout(function(){
                start()
            }, 800)
            
        }

    } else {
        exit()
    }


}


function disableCheckbox(value) {
    lastOneCheckbox.disabled = value
}

function playSequence() {
    disableCheckbox(true)
    active = true
    let i

    if (lastOneCheckbox.checked === true) {
        i = sequence.length - 1
    } else {
        i = 0
    }
    
    interval = setInterval(function() {
        push(sequence[i])
        
        i++
        if (i >= sequence.length) {
            clearInterval(interval)
            active = false
            disableCheckbox(false)
        }
   }, 600);
}


function playSound(color) {
    const audio = document.getElementById(color);
    audio.currentTime = 0;
    audio.play()
}


// after click light up button and dose again
function lightUp(color) {
    const element = document.querySelector(`div[data-color="${color}"]`)
    element.style.backgroundColor = changeHslLight(colors[color], 20)
    setTimeout(function() {
        element.style.backgroundColor = colors[color]
        element.style.border = 'transparent'
    }, 500)
    element.border
}
function changeHslLight(hsl, change) {
    const str1 = hsl.slice(0, -9)
    const str = str1 + "100%, 55%)"
    return str
}


function push(color) {
    playSound(color)
    lightUp(color)
}

function playerPush(color) {
    if(inGame) {
        if (active === true) {
            exit()
            return
        }
        if (sequence.length > 0) {
            listen(Number(color))
            return
        }
    } else {
        push(color)
    }
    
}




function exit() {
    position = 0
    sequence = []
    if (Math.random() * 100 > 10){
        wrongSound.play()
    } else {
        wrongSound2.play()
    }
    clearInterval(interval)
    if(points != 1) {
        result.textContent = 'You have ' + points + ' points.'
    } else {
        result.textContent = 'You have ' + points + ' point.'
    }
    points = 0
    games++
    startBle(false)
}


function addNext() {
    let random = Math.floor(Math.random() * 4)
    sequence.push(random)
    // TODO vymazat log
    console.log(sequence)
    left = sequence.length
}