

// 
window.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        document.querySelector("#level-title").style.visibility = "hidden";
        // enter.play();
    }
    startGame();
})
window.addEventListener("touchstart", function (event) {
    document.querySelector("#level-title").style.visibility = "hidden";
    startGame();
});

let blueWav = new Audio('sound/blue.wav')
let greenWav = new Audio('sound/green.wav')
let pinkWav = new Audio('sound/pink.wav')
let purpleWav = new Audio('sound/purple.wav')
let wrong = new Audio('sound/wrong.wav')
let enter = new Audio('sound/enter.wav')
const tryAgain = document.querySelector('.btn-try-again')
let pink = document.querySelector('.pink')
let blue = document.querySelector('.blue')
let green = document.querySelector('.green')
let purple = document.querySelector('.purple')


let gameOverElement = document.querySelector(".game-over")
let scoreElement = document.querySelector('#score')
let lights = [pink, blue, green, purple]
let level = 1;
let sequence = [];
let clickCount = 0
let score = 0
let intervalId


function reset() {
    level = 1
    sequence = []
    clickCount = 0
    score = 0
    scoreElement.textContent = score
    clearInterval(intervalId)
    startGame()
}


function startGame() {
    generateSequence(2)
    // console.log(sequence)

}




function generateSequence(num) {
    sequence = []

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * lights.length);
        const randomLight = lights[randomIndex]
        sequence.push(randomLight)
    }
    let iteration = 0
    intervalId = setInterval(() => {
        const currentElement = sequence[iteration]
        currentElement.classList.add('active')



        if (pink.classList.contains("active")) {
            pinkWav.play();
        }

        if (green.classList.contains("active")) {
            greenWav.play();
        }

        if (blue.classList.contains("active")) {
            blueWav.play();
        }

        if (purple.classList.contains("active")) {
            purpleWav.play()
        }

        setTimeout(() => {
            currentElement.classList.remove('active')
        }, 800)
        iteration++
        if (iteration === sequence.length) {
            clearInterval(intervalId)
            playersTurn()
        }
    }, 1000)
}


pink.addEventListener("click", function () {
    pinkWav.play()
})
green.addEventListener("click", function () {
    greenWav.play()
})
blue.addEventListener("click", function () {
    blueWav.play()
})
purple.addEventListener("click", function () {
    purpleWav.play()
})

function playersTurn() {
    lights.forEach(button => {
        button.addEventListener("click", handleClick)
    })
}

function handleClick(event) {
    if (sequence[clickCount] === event.target) {
        clickCount++
        score += 10
        console.log('nice', score)
        scoreElement.textContent = score
        setTimeout(() => {
            if (sequence.length === clickCount) {
                // console.log('YESSSSS')
                clickCount = 0
                level++
                generateSequence(1.4 * level)
            }
        }, 900)
    } else {
        wrong.play();
        gameOver();

        //    console.log("loose")
    }
}


function gameOver() {
    gameOverElement.style.display = "block"
    tryAgain.addEventListener("click", () => {

        tryAgain.classList.add('remove')

        gameOverElement.style.display = "none"
        console.log("yes a wantoutraille")
        reset();

    })

}

