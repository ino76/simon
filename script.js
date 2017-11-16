// Simon game
// author: Daniel Cech 2017

const colors = ["hsl(16, 83%, 43%)", "hsl(153, 72%, 45%)", "hsl(204, 78%, 40%)", "hsl(60, 78%, 49%)"]
const buttons = document.querySelectorAll('.simBut')
setColors();


buttons.forEach(button => {
    button.addEventListener('click', push)
})


// set colors at window.load
function setColors() {
    for (i = 0; i < 4; i++) {
        buttons[i].style.backgroundColor = colors[i];
    }
}

function playSound(color) {
    const audio = document.getElementById(color);
    audio.play()
}

function ahoj(a) {
    alert('ahoj ' + a)
}

// after click light up button and dose again
function lightUp(element, color) {
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
    console.log(str)
    return str
}

function push() {
    let color = this.dataset.color
    playSound(color)
    lightUp(this, color)
}