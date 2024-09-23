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
let questionTimeRemaining = 30; 
let totalQuizTimeRemaining = 150; 
let quizTimer, questionTimer;

function updateTotalTime() {
    process.stdout.write(`\rTotal quiz time remaining: ${totalQuizTimeRemaining} seconds  `);
}

function askQuestion() {
    if (currentQuestionIndex >= questions.length || totalQuizTimeRemaining <= 0) {
        endQuiz();
        return;
    }

    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`);
    questions[currentQuestionIndex].options.forEach(option => console.log(option));

    questionTimeRemaining = 30; 
    questionTimer = setInterval(() => {
        questionTimeRemaining--;
        totalQuizTimeRemaining--;

        if (questionTimeRemaining <= 0 || totalQuizTimeRemaining <= 0) {
            console.log(`\nTime's up for this question! The correct answer was: ${questions[currentQuestionIndex].answer}`);
            clearInterval(questionTimer);
            nextQuestion();
        } else {
            updateTotalTime(); 
        }
    }, 1000);

    rl.question('Select your answer (1-4): ', (userAnswer) => {
        clearInterval(questionTimer); 
        handleUserAnswer(userAnswer.trim());
    });
}

function handleUserAnswer(userAnswer) {
    const validInput = /^[1-4]$/.test(userAnswer); // Regex to check if input is between 1 and 4

    if (!validInput) {
        console.log("Invalid input. Please enter a number between 1 and 4.");
        askQuestion(); // Ask the question again if input is invalid
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
