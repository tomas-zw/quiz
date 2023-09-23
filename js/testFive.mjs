import { getAllShapes, makeStartGameButton } from "./boxes.mjs";
import { shuffleItems, testWelcome } from "./helpers.mjs";
import { imDoneStartNextTest } from "./main.js";
import { reportTestScore } from "./score.mjs";

const testName = "Perception";
const testHeader = "UppfattningsFörmåga";
const testText = `Du kommer få se en bild i 1 sekund. Klicka på alla bilder som
    1. Har annan färg än röd.
    2. Har annan form än kvadrat.
    3. Är röd och kvadrat.`;

let testContainer = "";
let score = 0;
const maxScore = 5;
// let header = ""; // HTMLElement set in startTest()
let bodyText = ""; // HTMLElement set in startTest()
let startGameButton = ""; // HTMLElement set in startTest()

/** ------------------------test---------------------------------------------- */
let allShapes = [];
let oneSecInterval = "";
let currentShape = 0;

/**
 * starts the test
 * @function startPerceptionTest
 * @returns void
 */
function startPerceptionTest () {
    startGameButton.removeEventListener("click", startPerceptionTest);
    startGameButton.style.display = "none";
    bodyText.innerHTML = "";
    allShapes = getAllShapes();
    shuffleItems(allShapes);
    showShape();
    oneSecInterval = setInterval(showShape, 2000);
};

/**
 * shows shapes with an interval
 * @function showShape
 * @returns void
 */
function showShape () {
    const tempBox = testContainer.appendChild(allShapes[currentShape].box);
    tempBox.addEventListener("click", checkIfCorrectAnswer);
    setTimeout(function () {
        tempBox.removeEventListener("click", checkIfCorrectAnswer);
        tempBox.remove();
        if (currentShape < allShapes.length - 1) {
            currentShape += 1;
        } else {
            const result = `Du fick ${score} av ${maxScore} möjliga poäng.`;
            clearInterval(oneSecInterval);
            testDone(result);
        };
    }, 1000);
};

/**
 * check if user picked the correct answer
 * @function checkIfCorrectAnswer
 * @returns void
 */
function checkIfCorrectAnswer () {
    const isSquare = (this.style.width).localeCompare(this.style.height);
    const radius = parseInt(this.style.borderRadius) || 0;
    const width = parseInt(this.style.width);
    if (this.style.backgroundColor === "red" || this.style.borderBottom === "100px solid red") {
        if (width > 0 && isSquare === 0 && radius === 0) {
            score += 1;
        }
    } else {
        score += 1;
        if (width > 0 && isSquare === 0 && radius === 0) {
            score -= 1;
        };
    };
};

/** -------------------------------------------------------------------------- */

/**
 * show test start screen
 * @function startTest
 * @returns void
 */
function startTest () {
    testWelcome(testContainer, testHeader, testText);
    // header = document.getElementById("testheader");
    bodyText = document.getElementById("testtext");
    startGameButton = makeStartGameButton("Starta test");
    testContainer.appendChild(startGameButton);
    addEventListenerToStartButton();
}

/**
 * adds listener to startbutton
 * @function addEventListenerToStartButton
 * @returns void
 */
function addEventListenerToStartButton () {
    startGameButton.addEventListener("click", startPerceptionTest);
};

/**
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
    score = 0;
    currentShape = 0;
    clearInterval(oneSecInterval);
    startTest();
};

/**
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() report score to scoreboard.
 */
const perception = {
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

export { perception };
