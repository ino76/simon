// Simon game
// author: Daniel Cech 2017


const startButton = document.getElementById('start')
const result = document.getElementById('result')
const colors = ["hsl(16, 83%, 43%)", "hsl(153, 72%, 45%)", "hsl(204, 78%, 40%)", "hsl(60, 78%, 49%)"]
const buttons = document.querySelectorAll('.simBut')
const wrongSound = document.getElementById('wrong')
const wrongSound2 = document.getElementById('wrong2')
setColors()
setListeners()

let sequence = []
let active = false
let interval
let position = 0
let points = 0
let games = 1


function startBle(value) {
    startButton.disabled = value
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
            start()
        }

    } else {
        exit()
    }


}


function playSequence() {
    let i = 0
    interval = setInterval(function() {
        push(sequence[i])
        active = true

        i++
        if (i >= sequence.length) {
            clearInterval(interval)
            active = false
        }
   }, 800);
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
    element.style.border = '4px solid rgba(0, 0, 0, 0.2)'
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
    // const thisButton = document.querySelector(`div[data-color="${color}"`)
    if (active === true) {
        exit()
        return
    }
    if (sequence.length > 0) {
        listen(Number(color))
        return
    }
}


function setNew() {
    position = 0
    sequence = []
    result.textContent = ""
    points = 0
    startBle(true)
    start()
}

function exit() {
    
    if (games != 4){
        wrongSound.play()
    } else {
        wrongSound2.play()
    }
    clearInterval(interval)
    active = false
    result.textContent = 'You have ' + points + ' points.'
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