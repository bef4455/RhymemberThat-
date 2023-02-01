window.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        document.querySelector("#level-title").style.display = "none";
        startGame()
        
    }
})

let pink = document.querySelector('#pink')
let blue = document.querySelector('#blue')
let green = document.querySelector('#green')
let purple = document.querySelector('#purple')
let lights = [pink, blue, green, purple]
let level = 0;
let sequence = [];
let intervalId


function startGame() {
    // let userChoseColour = document.getElementById("level-title");
    // userClick.push()
    generateSequence(4)
    console.log(sequence)
}

function generateSequence(num) {
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * lights.length);
        const randomLight = lights[randomIndex]
        sequence.push(randomLight)
    }
    let iteration = 0
    intervalId = setInterval(() => {
        const currentElement = sequence[iteration]
        currentElement.classList.add('active')
        setTimeout(() => {
            currentElement.classList.remove('active')
        }, 400)
        iteration++
        if (iteration === sequence.length) {
            clearInterval(intervalId)
        }
    }, 500)
}
// console.log(sequence)
// generateSequence(4)
// console.log(sequence)

// console.log(activLights.map(sequence => activLights.length));
