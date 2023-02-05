
window.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        document.querySelector("#level-title").style.visibility = "hidden";
    }
    startGame();
})
window.addEventListener("touchstart", function (event) {
    document.querySelector("#level-title").style.visibility = "hidden";
    startGame();
});

const blueWav = new Audio('sound/blue.wav')
const greenWav = new Audio('sound/green.wav')
const pinkWav = new Audio('sound/pink.wav')
const purpleWav = new Audio('sound/purple.wav')
const wrong = new Audio('sound/wrong.wav')

const tryAgain = document.querySelector('.btn-try-again')
const pink = document.querySelector('.pink')
const blue = document.querySelector('.blue')
const green = document.querySelector('.green')
const purple = document.querySelector('.purple')


let gameOverElement = document.querySelector(".game-over")
let scoreElement = document.querySelector('#score')
let lights = [pink, blue, green, purple]
let level = 1;
let sequence = [];
let clickCount = 0
let score = 0
let intervalId

// This method resets the game by setting all the variables back to their initial values, and then calls the startGame method.
function reset() {
    level = 1
    sequence = []
    clickCount = 0
    score = 0
    scoreElement.textContent = score
    clearInterval(intervalId)
    startGame()
}

// This method generates the sequence of lights that the player needs to repeat, and starts the sequence.
function startGame() {
    generateSequence(2)
}

// This method creates a random sequence of lights, and displays the sequence to the player.
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

// This method allows the player to click on the lights, and is triggered when the sequence of lights is finished.
function playersTurn() {
    lights.forEach(button => {
        button.addEventListener("click", handleClick)
    })
}

// This method checks if the light that the player clicked on is the correct one, and updates the score accordingly. If the player clicks on the wrong light, it calls the gameOver method.
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
    }
}

// This method displays the game over screen and provides a button for the player to restart the game.
function gameOver() {
    gameOverElement.style.display = "block"
    tryAgain.addEventListener("click", () => {
        tryAgain.classList.add('remove')
        gameOverElement.style.display = "none"
        reset();
    })
}

