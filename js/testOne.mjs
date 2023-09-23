import { makeStartGameButton } from "./boxes.mjs";
import { testWelcome } from "./helpers.mjs";
import { imDoneStartNextTest } from "./main.js";
import { reportTestScore } from "./score.mjs";

const testName = "Tipsfrågor";
const quizHeader = "Tipsfrågor";
const quizText = "Du kommer få fem st frågor. Rätt svar ger 3 poäng och fel svar ger 0 poäng.";
let testContainer = ""; // HTMLElement set in start()
let score = 0;

const nextQuestionBox = makeStartGameButton("Starta test");

const questions = [
    {
        question: "6 + 3 = ?",
        correctAnswer: "1001",
        answerOne: "1101",
        answerTwo: "1000"
    },
    {
        question: "Polens nationaldag är?",
        correctAnswer: "11 November",
        answerOne: "varje dag",
        answerTwo: "12 September"
    },
    {
        question: "Emmys födelsedag är?",
        correctAnswer: "22 Mars",
        answerOne: "7 Juni",
        answerTwo: "Vem fan är Emmy?"
    },
    {
        question: "Hur många månader har 28 dagar?",
        correctAnswer: "12",
        answerOne: "1",
        answerTwo: "0"
    },
    {
        question: "Guld i Periodiska systemet är?",
        correctAnswer: "Au",
        answerOne: "Ag",
        answerTwo: "Al"
    },
    {
        question: "CSS är en förkortning för?",
        correctAnswer: "Cascading Style Sheet",
        answerOne: "Comma Separerad Särbo",
        answerTwo: "Crash! Shmock! Skapow!"
    }
];

const maxScore = questions.length * 3;

/** ----------------------Quiz logic------------------------------------------- */

let indexOfQuestion = 0;
let header = ""; // HTMLElement set in startTest()
let bodyText = ""; // HTMLElement set in startTest()
const answerContainer = document.createElement("div");
const answerOne = nextQuestionBox.cloneNode(true);
const answerTwo = nextQuestionBox.cloneNode(true);
const answerThree = nextQuestionBox.cloneNode(true);
const allAnswers = [answerOne, answerTwo, answerThree];
let correctAnswer = "";

/**
 * starts chain of assigning questions and answers to correct elements
 * @function askQuestion
 * @returns void
 */
function askQuestion () {
    nextQuestionBox.style.opacity = "0.1";
    nextQuestionBox.removeEventListener("click", askQuestion);
    clearColorOnAnswerBox();
    assignQuestionToBox();
    addEventListenerToAnswers();
    shuffleAnswers();
    showQuestion();
};

/**
 * set answers to buttons
 * @function assignQuestionToBox
 * @returns void
 */
function assignQuestionToBox () {
    answerOne.innerHTML = questions[indexOfQuestion].answerOne;
    answerTwo.innerHTML = questions[indexOfQuestion].answerTwo;
    answerThree.innerHTML = questions[indexOfQuestion].correctAnswer;
    correctAnswer = questions[indexOfQuestion].correctAnswer;
};

/**
 * randomize position of answers
 * @function shuffleAnswers
 * @returns void
 */
function shuffleAnswers () {
    for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = allAnswers[i];
        allAnswers[i] = allAnswers[j];
        allAnswers[j] = temp;
    };
};

/**
 * show current question
 * @function showQuestion
 * @returns void
 */
function showQuestion () {
    header.innerHTML = `Fråga ${indexOfQuestion + 1}`;
    bodyText.innerHTML = questions[indexOfQuestion].question;
};

/**
 * see if user picked the correct answer
 * @function checkIfCorrectAnswer
 * @returns void
 */
function checkIfCorrectAnswer () {
    if (this.innerHTML === correctAnswer) {
        score += 3;
    };
    for (const answer of allAnswers) {
        if (answer.innerHTML === correctAnswer) {
            answer.style.backgroundColor = "green";
        } else {
            answer.style.backgroundColor = "red";
        };
        answer.removeEventListener("click", checkIfCorrectAnswer);
    };
    if (indexOfQuestion === questions.length - 1) {
        testDone();
    } else {
        indexOfQuestion += 1;
        nextQuestionBox.innerHTML = `fråga ${indexOfQuestion + 1}`;
        nextQuestionBox.style.opacity = "1";
        addEventListenerToStartButton();
    };
};

/**
 * show result and notify main that test is done
 * @function testDone
 * @returns void
 */
function testDone () {
    header.innerHTML = "Resultat";
    bodyText.innerHTML = `Du fick ${score} av ${maxScore} möjliga poäng.`;
    imDoneStartNextTest();
};

/**
 * set the color to default on answer buttons
 * @function clearColorOnAnswerBox
 * @returns void
 */
function clearColorOnAnswerBox () {
    for (const answer of allAnswers) {
        answer.style.backgroundColor = "white";
        answerContainer.appendChild(answer);
    };
};

/**
 * set eventlistener on all answer buttons
 * @function addEventListenerToAnswers
 * @returns void
 */
function addEventListenerToAnswers () {
    for (const answer of allAnswers) {
        answer.addEventListener("click", checkIfCorrectAnswer);
    };
};

/**
 * set eventlistener to game button
 * @function addEventListenerToStartButton
 * @returns void
 */
function addEventListenerToStartButton () {
    nextQuestionBox.addEventListener("click", askQuestion);
};

/** ----------------------Quiz UI--------------------------------------------- */

/**
 * Show Quiz start screen
 * @function startTest
 * @returns void
*/
function startTest () {
    testWelcome(testContainer, quizHeader, quizText);
    header = document.getElementById("testheader");
    bodyText = document.getElementById("testtext");
    testContainer.appendChild(answerContainer);
    testContainer.appendChild(nextQuestionBox);
    addEventListenerToStartButton();
};

/**
 * clears testcontainer
 * @function clearParentElement
 * @returns void
*/
function clearParentElement () {
    testContainer.innerHTML = "";
    answerContainer.innerHTML = "";
};

/**
 * clears and resets quiz
 * @function resetTest
 * @returns void
 */
function resetTest () {
    clearParentElement();
    startTest();
    indexOfQuestion = 0;
    score = 0;
    nextQuestionBox.innerHTML = "Starta test";
    nextQuestionBox.style.opacity = "1";
};

/**
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() report score to scoreboard.
 */
const quiz = {
    name: testName,
    start: function (parentElement) {
        testContainer = parentElement;
        startTest();
    },
    done: function () {
        clearParentElement();
    },
    reset: function () {
        resetTest();
    },
    reportScore: function () {
        reportTestScore(testName, score, maxScore);
    }
};

export { quiz };
