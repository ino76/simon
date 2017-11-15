// Simon game
// author: Daniel Cech 2017






function playSound(color) {
    const audio = document.getElementById(color);
    audio.play()
    light(color)
}

function light(color) {
    const element = document.querySelector('data[' + color + ']')
}