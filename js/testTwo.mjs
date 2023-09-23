import { makeBox, makeStartGameButton } from "./boxes.mjs";
import { testWelcome } from "./helpers.mjs";
import { imDoneStartNextTest } from "./main.js";
import { reportTestScore } from "./score.mjs";

const testName = "FizzBuzz";
const fizzBuzzHeader = "FizzBuzz";
const fizzBuzzText = `Svara "Fizz" om nästa tal i tal-följden är delbart med 3, "Buzz" om det är delbart med 5 eller "FizzBuzz" om det är delbart med både 3 och 5.
    Rätt svar ger 3 poäng.`;

let testContainer = "";
let score = 0;
const maxScore = 3;
// let header = ""; // HTMLElement set in startTest()
let bodyText = ""; // HTMLElement set in startTest()
let startGameButton = ""; // HTMLElement set in startTest()
let answerButtons = [];
let nrSequence = [];

/**
 * starts the actual test
 * @function startFizzBuzz
 * @returns void
 */
function startFizzBuzz () {
    nrSequence = generateSequence();
    bodyText.innerHTML = generateQuestion(nrSequence);
    generateAnswerButtons(nrSequence.slice(-1));
    addEventListnerToAnswers();
    appendAnswerButtons();
    startGameButton.removeEventListener("click", startFizzBuzz);
    startGameButton.style.display = "none";
};

/**
 * adds eventlistener to all answer buttons
 * @function addEventListenerToAnswers
 * @returns void
 */
function addEventListnerToAnswers () {
    for (const button of answerButtons) {
        button.addEventListener("click", checkIfCorrectAnswer);
    }
};

/**
 * check if user picked correct answer
 * @function checkIfCorrectAnswer
 * @returns void
 */
function checkIfCorrectAnswer () {
    const correctAnswer = (checkIfFizzBuzz(nrSequence.slice(-1))).toString();
    let result = `FEL. Du fick ${score} av ${maxScore} möjliga poäng.`;
    if (this.innerHTML === correctAnswer) {
        score += 3;
        result = `RÄTT. Du fick ${score} av ${maxScore} möjliga poäng.`;
    };
    for (const answer of answerButtons) {
        if (answer.innerHTML === correctAnswer) {
            answer.style.backgroundColor = "green";
        } else {
            answer.style.backgroundColor = "red";
        };
        answer.removeEventListener("click", checkIfCorrectAnswer);
    };
    testDone(result);
};

/**
 *
 * show result and notify main that test is done
 * @function testDone
 * @param {string} result
 * @returns void
 */
function testDone (result) {
    bodyText.innerHTML = result;
    imDoneStartNextTest();
};

/**
 * appends all buttons to testdiv
 * @function appendAnswerButtons
 * @returns void
 */
function appendAnswerButtons () {
    for (const button of answerButtons) {
        testContainer.appendChild(button);
    };
};

/**
 * makes the answers with correct text
 * @function generateAnswerButtons
 * @param {number} theNumber
 * @returns void
 */
function generateAnswerButtons (theNumber) {
    const words = ["Fizz", "Buzz", "FizzBuzz"];
    const size = { width: "150px", height: "60px" };
    const border = "1px solid black";
    const backgroundColor = "white";
    const radius = "5px";
    for (let i = 0; i < words.length; i++) {
        const temp = makeBox(size, border, backgroundColor, radius, words[i]);
        temp.style.justifySelf = "center";
        answerButtons.push(temp);
    };
    const tempButton = makeBox(size, border, backgroundColor, radius, theNumber);
    tempButton.style.justifySelf = "center";
    answerButtons.push(tempButton);
};

/**
 * makes the string for the question
 * @function generateQuestion
 * @param {array} nrSequence
 * @returns string
 */
function generateQuestion (nrSequence) {
    let questionString = "";
    for (const fizzNr of nrSequence.slice(0, -1)) {
        questionString += checkIfFizzBuzz(fizzNr) + ", ";
    };
    questionString += "?";
    return questionString;
};

/**
 * check if a number is fizzbuzz
 * @function checkIfFizzBuzz
 * @param {number} numberToCheck
 * @returns string
 */
function checkIfFizzBuzz (numberToCheck) {
    let answer = numberToCheck;
    if (numberToCheck % 3 === 0) {
        answer = "Fizz";
        if (numberToCheck % 5 === 0) {
            answer = "FizzBuzz";
        };
    } else if (numberToCheck % 5 === 0) {
        answer = "Buzz";
    };
    return answer;
};

/**
 *
 * makes a sequence of 5 numbers
 * @function generateSequence
 * @returns array
 */
function generateSequence () {
    const startNumber = Math.floor(Math.random() * (100 - 50 + 1) + 50);
    const numberSequence = [];
    for (let i = 0; i < 5; i++) {
        numberSequence.push(startNumber + i);
    }
    return numberSequence;
};

/**
 * adds listener to startbutton
 * @function addEventListenerToStartButton
 * @returns void
 */
function addEventListenerToStartButton () {
    startGameButton.addEventListener("click", startFizzBuzz);
};

/**
 * show FizzBuzz start screen
 * @function startTest
 * @returns void
 */
function startTest () {
    testWelcome(testContainer, fizzBuzzHeader, fizzBuzzText);
    // header = document.getElementById("testheader");
    bodyText = document.getElementById("testtext");
    startGameButton = makeStartGameButton("Starta test");
    testContainer.appendChild(startGameButton);
    addEventListenerToStartButton();
}

/**
 * clears testcontainer
 * @function clearParentElement
 * @returns void
 */
function clearParentElement () {
    testContainer.innerHTML = "";
};

/**
 * clears and resets test
 * @function resetTest
 * @returns void
 */
function resetTest () {
    clearParentElement();
    startTest();
    answerButtons = [];
    score = 0;
};

/**
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() report score to scoreboard.
 */
const fizzBuzz = {
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

export { fizzBuzz };
