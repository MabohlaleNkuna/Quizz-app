const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    { question: "What does 'var' stand for in JavaScript?", answer: "variable", options: ["1. variable", "2. value", "3. void", "4. vector"] },
    { question: "What is the correct syntax to declare an arrow function?", answer: "() => {}", options: ["1. function() {}", "2. () => {}", "3. function => {}", "4. function: {}"] },
    { question: "What is the difference between '==' and '===' in JavaScript?", answer: "strict equality", options: ["1. loose equality", "2. strict equality", "3. both are same", "4. type coercion"] },
    { question: "What does 'JSON' stand for?", answer: "JavaScript Object Notation", options: ["1. JavaScript Object Notation", "2. Java Standard Object Notation", "3. Java Source Object Notation", "4. None of the above"] },
    { question: "How can you create an object in JavaScript?", answer: "{}", options: ["1. []", "2. {}", "3. ()", "4. <>"] }
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuizTimeRemaining = 150;
let quizTimer;

function updateTotalTime() {
    process.stdout.write(`\rTotal quiz time remaining: ${totalQuizTimeRemaining} seconds  `);
}

function askQuestion() {
    if (currentQuestionIndex >= questions.length || totalQuizTimeRemaining <= 0) {
        endQuiz();
        return;
    }

    console.log(`\n\nQuestion ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`);
    questions[currentQuestionIndex].options.forEach(option => console.log(option));

    rl.question('\nSelect your answer (1-4): ', (userAnswer) => {
        handleUserAnswer(userAnswer.trim());
    });
}

function handleUserAnswer(userAnswer) {
    const validInput = /^[1-4]$/.test(userAnswer);

    if (!validInput) {
        console.log("Invalid input. Please enter a number between 1 and 4.");
        askQuestion();
    } else {
        checkAnswer(userAnswer);
    }
}

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    const selectedAnswer = questions[currentQuestionIndex].options[parseInt(userAnswer) - 1].slice(3).trim();

    if (selectedAnswer.toLowerCase() === correctAnswer) {
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
    rl.close();
    console.log(`\nQuiz over! Your final score is: ${score}/${questions.length}`);
}

function startQuiz() {
    console.log("\nWelcome to the JavaScript Quiz!");

    quizTimer = setInterval(() => {
        totalQuizTimeRemaining--;

        if (totalQuizTimeRemaining === 120 || totalQuizTimeRemaining === 90 || totalQuizTimeRemaining === 60 || totalQuizTimeRemaining === 30) {
            currentQuestionIndex++;
            askQuestion();
        }

        if (totalQuizTimeRemaining <= 0) {
            console.log('\nTotal quiz time is up!');
            clearInterval(quizTimer);
            endQuiz();
        }

        updateTotalTime();
    }, 1000);

    askQuestion();
}

startQuiz();
