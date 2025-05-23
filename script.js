const difficulties = [[-50,50], [-1000, 1000], [-10000,10000]]
var difficulty = ""
const question = document.getElementById("question")
const beginnerButton = document.getElementById("beginnerButton")
const intermediateButton = document.getElementById("intermediateButton")
const advancedButton = document.getElementById("advancedButton")
const tryAgainButton = document.getElementById("tryAgainButton")
const submitButton = document.getElementById("submitButton")
const nextButton = document.getElementById('nextButton')
const inputBox = document.getElementById('answer')
const dialogue = document.getElementById('dialogue')
const scoreDisplay = document.getElementById('score')

var answer = 0
var score = 0
var round = 1
const operators = [{
    sign: "+",
    method: function(a,b){return a + b}
},{
    sign: "-",
    method: function(a,b){return a - b}
},{
    sign: "*",
    method: function(a,b){return a * b}
},{
    sign: "/",
    method: function(a,b){return Math.round((a / b)*100)/100}
}
]

function enterQuizMode() {
    resetGameState()
    beginnerButton.disabled = true
    intermediateButton.disabled = true
    advancedButton.disabled = true
    tryAgainButton.disabled = false
    submitButton.disabled = false
    dialogue.innerHTML = ""
    quizHandler()
}

function quizHandler () {
    let newQuestion = generateQuestion(difficulties[difficulty])
    question.innerHTML = newQuestion
}

function generateQuestion (range){
    let num1 = Math.floor(Math.random() * (range[1] - range[0])) + range[0]
    let num2 = Math.floor(Math.random() * (range[1] - range[0])) + range[0]
    let op = operators[Math.floor(Math.random() * (4))]
    answer = op.method(num1, num2)
    if (num1 < 0) {
        num1 = "(" + num1 + ")"
    }
    if (num2 < 0) {
        num2 = "(" + num2 + ")"
    }
    return String(num1 + " " + op.sign + " " + num2)
}

function submitHandler() {
    dialogue.innerHTML = ""
    let input = parseFloat(inputBox.value)
    if (isNaN(input)) {
        dialogue.innerHTML = "Please enter a number"
        return
    }
    if (input === answer) {
        score++
        scoreDisplay.innerText = score + "/10"
        dialogue.innerHTML = "Correct!"
    } else {
        dialogue.innerHTML = "Incorrect!<br>Answer: " + answer
    }
    submitButton.disabled = true
    nextButton.disabled = false
}

function nextHandler() {
    if (round > 9) {
        dialogue.innerHTML = "Quiz Complete! Your final score was " + score + "/10"
        beginnerButton.disabled = false
        intermediateButton.disabled = false
        advancedButton.disabled = false
        tryAgainButton.disabled = false
        submitButton.disabled = true
        nextButton.disabled = true
        console.log("end reached")
        return
    }
    submitButton.disabled = false
    nextButton.disabled = true
    dialogue.innerHTML = ''
    inputBox.value = ''
    round++
    quizHandler()
}

function setDifficulty (e) {
    difficulty = e.target.value
    enterQuizMode()
}

beginnerButton.addEventListener("click", setDifficulty)
intermediateButton.addEventListener("click", setDifficulty)
advancedButton.addEventListener("click", setDifficulty)
submitButton.addEventListener("click", submitHandler)
nextButton.addEventListener('click', nextHandler)

tryAgainButton.addEventListener("click", function () {
    dialogue.innerHTML = "Trying again..."
    
    // delay resetting the game by one second
    setTimeout(function () {
        enterQuizMode()
    }, 1000)
})



function resetGameState() {
    beginnerButton.disabled = false
    intermediateButton.disabled = false
    advancedButton.disabled = false
    tryAgainButton.disabled = true
    submitButton.disabled = true
    nextButton.disabled = true
    inputBox.value = ""
    question.innerHTML = ""
    dialogue.innerHTML = "Select a difficulty"
    scoreDisplay.innerText = "/10"
    score = 0
    round = 1
}

window.onload = resetGameState