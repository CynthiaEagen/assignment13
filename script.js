const difficulties = [[-50,50], [-1000, 1000], [-10000,10000]]
var difficulty = ""
const question = document.getElementById("question")
const beginnerButton = document.getElementById("beginnerButton")
const intermediateButton = document.getElementById("intermediateButton")
const advancedButton = document.getElementById("advancedButton")
var answer = 0
var operators = [{
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

function quizHandler () {
    let newQuestion = generateQuestion(difficulties[difficulty])
    question.innerHTML = newQuestion
}

function generateQuestion (range){
    let num1 = Math.floor(Math.random() * (range[1] - range[0])) + range[0]
    let num2 = Math.floor(Math.random() * (range[1] - range[0])) + range[0]
    let op = operators[Math.floor(Math.random() * (4))]
    console.log(op)
    answer = op.method(num1, num2)
    console.log(answer)
    return String(num1 + op.sign + num2)
}

function setDifficulty (e) {
    difficulty = e.target.value
}

beginnerButton.addEventListener("click", setDifficulty)
beginnerButton.addEventListener("click", quizHandler)
intermediateButton.addEventListener("click", setDifficulty)
intermediateButton.addEventListener("click", quizHandler)
advancedButton.addEventListener("click", setDifficulty)
advancedButton.addEventListener("click", quizHandler)
