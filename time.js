const start = document.querySelector('[start]')
const sec = document.getElementsByName("second")
const min = document.getElementsByName("minute")
const hr = document.getElementsByName("hour")
const reset = document.querySelector('[rreset]')
const timer = document.querySelector('[timer]')
const stopwatch = document.querySelector('[stopwatch]')
let timerorstopwatch = 1// if its equal to 1, its a timer. if its 0, its a stopwatch

// the style had to be implemented here because it was not being applied on the css file 
timer.style.color = "rgb(100, 150, 255)"
timer.style.borderBottom = "1px solid rgb(100, 150, 255)"


let startOrPaused = 0 // when it is = 0, it means it has not started
var interval 
var stopWatchInt

timer.addEventListener('click', () => {
    timer.style.color = "rgb(100, 150, 255)"
    timer.style.borderBottom = "1px solid rgb(100, 150, 255)"
    stopwatch.style.color = "gray"
    stopwatch.style.borderBottom = "none"

    reset_all()
    if (timerorstopwatch == 0) {
        clearInterval(stopWatchInt)
    }

    timerorstopwatch = 1
    startOrPaused = 0       // so the butotn reverts back to "start" if it isn't already reset
    start.textContent = "START"
    
})


stopwatch.addEventListener('click', () => {
    stopwatch.style.color = "rgb(100, 150, 255)"
    stopwatch.style.borderBottom = "1px solid rgb(100, 150, 255)"

    timer.style.color = "gray"
    timer.style.borderBottom = "none"

    timerorstopwatch = 0 
    startOrPaused = 0       // so the butotn reverts back to "start" if it isn't already reset
    start.textContent = "START"
    reset_all()
})




start.addEventListener('click', button => {
    if (timerorstopwatch == 1) {
        if (startOrPaused === 0) {          // if it hasnt started, and the button is pressed, the button will change to pause 
            start.textContent = "PAUSE"
            startOrPaused = 1
            convert()
            interval = setInterval(countdown, 1000)
            
            sec[0].placeholder = sec[0].value
            min[0].placeholder = min[0].value
            hr[0].placeholder = hr[0].value
        } else {
            pause()
        }
    } else {
        convert()
        
        if (startOrPaused === 0) {
            stopWatchInt = setInterval(counting, 1000)
            start.textContent = "PAUSE"
            startOrPaused = 1
        } else {
            pause()
            clearInterval(stopWatchInt)
        }
    }
    
    
})


// reset.addEventListener('click', resetting => {
//     min[0].value = ""
//     sec[0].value = ""
//     hr[0].value = ""
// })

reset.addEventListener('click', reset_all)


function countdown() {

    
    if (sec[0].value == 0) {
        min[0].value --
        sec[0].value = 59
    } else {
        sec[0].value--
    }
    

    if (min[0].value < 0) {
        hr[0].value --
        min[0].value = 59
    }
    
    if (hr[0].value < 0) { // this is the condition that checks if the time is up
        sec[0].placeholder = "00"
        min[0].placeholder = "00"
        hr[0].placeholder = "00"
        reset_all()
        pause() // this simulates the pause button being pressed
    }
    
}


function convert() {
    let seconds = parseInt(sec[0].value)
    let minute = parseInt(min[0].value)
    let hour = parseInt(hr[0].value)

    if (isNaN(minute)) {
        minute = 0
    }

    if (isNaN(seconds)) {
        seconds = 0
    }

    if (isNaN(hour)) {
        hour = 0
    }

    minute += Math.floor(seconds / 60)
    seconds = seconds % 60
    hour += Math.floor(minute / 60)
    minute = minute % 60

    

    min[0].value = minute
    sec[0].value = seconds
    hr[0].value = hour


}



function reset_all() {
    min[0].value = ""
    sec[0].value = ""
    hr[0].value = ""
}



function pause() {
    start.textContent = "START"
    startOrPaused = 0
    clearInterval(interval)
}


function counting() {

    if (sec[0].value == 59) {
        min[0].value++
        sec[0].value = 0

    } else {
        sec[0].value++
    }

    if (min[0].value == 60) {
        hr[0].value++
        min[0].value = 0
    }
    
}










// function clearinput() {
//     sec[0].value = ""
//     console.log("works")
// }

// sec.addEventListener('click', () => {
//     sec[0].value = ""
//     console.log("works")
// })