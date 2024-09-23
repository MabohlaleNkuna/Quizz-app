const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { question: "What does 'var' stand for in JavaScript?", answer: "variable" },
    { question: "What is the correct syntax to declare an arrow function?", answer: "() => {}" },
    { question: "What is the difference between '==' and '===' in JavaScript?", answer: "strict equality" },
    { question: "What does 'JSON' stand for?", answer: "JavaScript Object Notation" },
    { question: "How can you create an object in JavaScript?", answer: "{}" }
];

let currentQuestionIndex = 0;
let score = 0;
let questionTimeRemaining = 60; 
let totalQuizTimeRemaining = 300; 
let quizTimer, questionTimer;

function askQuestion() {
    if (currentQuestionIndex >= questions.length || totalQuizTimeRemaining <= 0) {
        endQuiz();
        return;
    }
    
    console.log(`\nTotal quiz time remaining: ${totalQuizTimeRemaining} seconds`);
    console.log(`Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`);
    
    questionTimeRemaining = 60; 
    questionTimer = setInterval(() => {
        questionTimeRemaining--;
        totalQuizTimeRemaining--;
        if (questionTimeRemaining <= 0 || totalQuizTimeRemaining <= 0) {
            console.log(`\nTime's up for this question! The correct answer was: ${questions[currentQuestionIndex].answer}`);
            clearInterval(questionTimer);
            nextQuestion();
        }
    }, 1000);

    rl.question('Your answer: ', (userAnswer) => {
        clearInterval(questionTimer); 
        checkAnswer(userAnswer.trim());
    });
}

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    if (userAnswer.toLowerCase() === correctAnswer) {
        score++;
        console.log('Correct!');
    } else {
        console.log(`Incorrect! The correct answer was: ${correctAnswer}`);
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    askQuestion();
}

function endQuiz() {
    clearInterval(quizTimer);
    clearInterval(questionTimer);
    rl.close();
    console.log(`\nQuiz over! Your final score is: ${score}/${questions.length}`);
}

function startQuiz() {
    console.log("\nWelcome to the JavaScript Quiz!");
    quizTimer = setInterval(() => {
        totalQuizTimeRemaining--;
        if (totalQuizTimeRemaining <= 0) {
            console.log('\nTotal time is up for the quiz!');
            endQuiz();
        }
    }, 1000);
    askQuestion();
}

startQuiz();
