// Simon game
// author: Daniel Cech 2017


const colors = ["hsl(16, 83%, 43%)", "hsl(153, 72%, 45%)", "hsl(204, 78%, 40%)", "hsl(60, 78%, 49%)"]
const buttons = document.querySelectorAll('.simBut')
const wrongSound = document.getElementById('wrong')

setColors()
setListeners()

let sequence = [0,1,3,3,2,3,0,1]
let active = false
let interval


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


function listen() {
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
        wrongSound.play()
        clearInterval(interval)
        active = false
        return
    }
    playSound(color)
    lightUp(color)
}


function addNext() {
    let random = Math.floor(Math.random() * 4)
    sequence.push(random)
    console.log(sequence)
}